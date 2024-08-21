$(document).ready(function () {
  var departments;
  var positions;
  var formMode = "edit";
  var employeeIDForEdit = null;
  var employeeIDForDelete = null;
  
  //Cập nhật departments và positions
  var getPositionsPromise = $.ajax({
    url: "http://localhost:5122/api/Positions/",
    method: "GET",
    dataType: "json",
  });

  var getDepartmentsPromise = $.ajax({
    url: "http://localhost:5122/api/Departments/",
    method: "GET",
    dataType: "json",
  });

  // Đợi cho cả hai cuộc gọi API hoàn tất
  $.when(getPositionsPromise, getDepartmentsPromise)
    .done(function (positionsResponse, departmentsResponse) {
      // Gán dữ liệu vào biến positions và departments
      positions = positionsResponse[0];
      departments = departmentsResponse[0];
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Lỗi khi lấy dữ liệu:", textStatus, errorThrown);
    });

  hideToast();
  // Hiển thị loading
  loadData();

  // Tìm kiếm bảng nhân viên theo từ khóa
  $("#searchInput").on("keyup", searchTable);

  // Đóng/mở navbar
  $(".sibar").click(function () {
    $(".navbar").toggleClass("active");
  });

  $("#btnThuGon").click(function () {
    $(".navbar").toggleClass("active");
  });
  // Xóa form khi nhấn nút xóa
  $(this).on("click", ".m-icon-delete", function () {
    $(".m-warning").css("display", "block");
  });

  // Mở form chỉnh sửa khi nhấn nút chỉnh sửa
  $("#employeeTable").on("click", ".m-icon-edit", function () {
    formMode = "edit";
    resetForm();
    let tr = $(this).closest("tr");
    let employee = tr.data("entity");

    let newDOB = "";
    if (employee.dateOfBirth) {
      newDOB = new Date(employee.dateOfBirth);
      let date = newDOB.getDate();
      let month = newDOB.getMonth() + 1;
      let year = newDOB.getFullYear();
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      newDOB = `${year}-${month}-${date}`;
    }

    let ngay_cap = "";
    if (employee.nationalityIdDate) {
      ngay_cap = new Date(employee.nationalityIdDate);
      let ngay_cap_date = ngay_cap.getDate();
      let ngay_cap_month = ngay_cap.getMonth() + 1;
      let ngay_cap_year = ngay_cap.getFullYear();
      ngay_cap_month =
        ngay_cap_month < 10 ? "0" + ngay_cap_month : ngay_cap_month;
      ngay_cap_date = ngay_cap_date < 10 ? "0" + ngay_cap_date : ngay_cap_date;
      ngay_cap = `${ngay_cap_year}-${ngay_cap_month}-${ngay_cap_date}`;
    }
    console.log(departments);
    // Tìm phòng ban và vị trí từ dữ liệu
    var department = departments.find(
      (dept) => dept.departmentId === employee.departmentId
    );
    var position = positions.find(
      (pos) => pos.positionId === employee.positionId
    );

    console.log("Department:", department);
    console.log("Position:", position);

    employeeIDForEdit = employee.employeeId;

    // Điền dữ liệu vào form
    $("#txtEmployeeCode").val(employee.employeeCode);
    $("#txtFullName").val(employee.fullName);
    $("#dateDOB").val(newDOB);
    $(
      "input[type='radio'][name='gioitinh'][value='" + employee.gender + "']"
    ).prop("checked", true);
    if (position) {
      $("#cbxViTri").val(position.positionName);
    } else {
      $("#cbxViTri").val("");
    }
    $("#txtCMTND").val(employee.nationalityId);
    $("#txtNgayCap").val(ngay_cap);
    if (department) {
      $("#cbxPhongBan").val(department.departmentName);
    } else {
      $("#cbxPhongBan").val("");
    }
    $("#txtNoiCap").val(employee.nationalityIdPlace);
    $("#txtDiaChi").val(employee.address);
    $("#txtDTDiDong").val(employee.mobilePhoneNumber);
    $("#txtDTCoDinh").val(employee.telephonePhoneNumber);
    $("#txtEmail").val(employee.email);
    $("#txtTaiKhoanNH").val(employee.bankAccount);
    $("#txtTenNganHang").val(employee.bankName);
    $("#txtChiNhanh").val(employee.bankBranch);
    $(".m-add-employee.m-dialog").show();
    $("#txtEmployeeCode").focus();
  });

  // Đóng form khi nhấn nút đóng hoặc hủy
  $(".m-button-close, .m-button-cancel").click(function () {
    $(".m-warning").hide();
  });

  // Đóng thông báo khi nhấn nút đóng
  $(".m-toast-close").click(function () {
    $(".m-toast-box").hide();
  });

  // Mở form thêm mới nhân viên
  $("#btn-active").click(function () {
    formMode = "add";
    resetForm();
    $(
      ".m-add-employee.m-dialog input[type='checkbox'], .m-add-employee.m-dialog input[type='radio']"
    ).prop("checked", false);
    $(
      ".m-add-employee.m-dialog input[type='text'], .m-add-employee.m-dialog textarea"
    ).val("");
    $(".m-add-employee.m-dialog select").val("defaultValue");
    $(".m-add-employee.m-dialog textarea").val("");
    $(".m-add-employee.m-dialog input[type='date']").val("");
    $(".m-add-employee.m-dialog").show();
    $("#txtEmployeeCode").focus();
  });

  // Đóng form thêm mới khi nhấn nút hủy hoặc đóng
  $("#btnCancelAddEm").click(function () {
    $(".m-add-employee.m-dialog").hide();
  });

  $("#btn_close_employee").click(function () {
    $(".m-add-employee.m-dialog").hide();
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  checkFormAddEmployee();

  // Xử lý sự kiện lưu form
  $("#btnDialogSave").click(function () {
    let employeeId = null;
    if (formMode === "edit") {
      employeeId = employeeIDForEdit;
    } else {
      employeeId = uuid.v4(employeeId);
    }
    let employeeCode = $("#txtEmployeeCode").val();
    let fullName = $("#txtFullName").val();
    let dob = $("#dateDOB").val();
    let genderName = $("input[type='radio'][name='gioitinh']:checked").val();
    let vi_tri = $("#cbxViTri").val();
    let CMTND = $("#txtCMTND").val();
    let ngay_cap = $("#txtNgayCap").val();
    let phong_ban = $("#cbxPhongBan").val();
    let noi_cap = $("#txtNoiCap").val();
    let dia_chi = $("#txtDiaChi").val();
    let DTDiDong = $("#txtDTDiDong").val();
    let DTCoDinh = $("#txtDTCoDinh").val();
    let email = $("#txtEmail").val();
    let TaiKhoanNH = $("#txtTaiKhoanNH").val();
    let tenNH = $("#txtTenNganHang").val();
    let chiNhanh = $("#txtChiNhanh").val();

    // Tìm vị trí từ dữ liệu
    let selectedPosition = positions.find(
      (position) => position.positionName == vi_tri
    );
    let vi_tri_id = selectedPosition ? selectedPosition.positionId : null;

    // Tìm phòng ban từ dữ liệu
    let selectedDepartment = departments.find(
      (department) => department.departmentName == phong_ban
    );
    let departmentId = selectedDepartment
      ? selectedDepartment.departmentId
      : null;

    let employee = {
      employeeId: employeeId,
      employeeCode: employeeCode,
      fullName: fullName,
      dateOfBirth: dob,
      gender: genderName,
      positionId: vi_tri_id,
      nationalityId: CMTND,
      nationalityIdDate: ngay_cap,
      departmentId: departmentId,
      nationalityIdPlace: noi_cap,
      address: dia_chi,
      mobilePhoneNumber: DTDiDong,
      telephonePhoneNumber: DTCoDinh,
      email: email,
      bankAccount: TaiKhoanNH,
      bankName: tenNH,
      bankBranch: chiNhanh,
    };

    // Kiểm tra tính hợp lệ của dữ liệu
    let birthDate = new Date(dob);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let ngay_cap_new = new Date(ngay_cap);
    currentDate.setHours(0, 0, 0, 0);

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (
      employeeCode == "" ||
      employeeCode == null ||
      fullName == "" ||
      fullName == null ||
      birthDate > currentDate ||
      CMTND == "" ||
      CMTND == null ||
      ngay_cap_new > currentDate ||
      DTDiDong == "" ||
      DTDiDong == null ||
      email == "" ||
      email == null ||
      !emailRegex.test(email)
    ) {
      $("#mToastInvalid").fadeIn();
      setTimeout(function () {
        $("#mToastInvalid").fadeOut();
      }, 12000);
    } else {
      $(".m-loading").show();
      if (formMode == "edit") {
        $.ajax({
          type: "PUT",
          url: `http://localhost:5122/api/Employees/${employeeIDForEdit}`,
          data: JSON.stringify(employee),
          dataType: "json",
          contentType: "application/json",
          success: async function (response) {
            $(".m-loading").hide();
            $(".m-add-employee.m-dialog").hide();
            await loadDataAndShowToast();
          },
          error: function (xhr, status, error) {
            $(".m-loading").hide();
            $("#mToastError").fadeIn();
            setTimeout(function () {
              $("#mToastError").fadeOut();
            }, 12000);
          },
        });
      } else if (formMode == "add") {
        $.ajax({
          type: "POST",
          url: "http://localhost:5122/api/Employees/",
          data: JSON.stringify(employee),
          dataType: "json",
          contentType: "application/json",
          success: async function (response) {
            $(".m-loading").hide();
            $(".m-add-employee.m-dialog").hide();
            await loadDataAndShowToast();
          },
          error: function (xhr, status, error) {
            $(".m-loading").hide();
            $(".m-add-employee.m-dialog").hide();
            $("#mToastError").fadeIn();
            setTimeout(function () {
              $("#mToastError").fadeOut();
            }, 12000);
          },
        });
      }
    }
  });

  //Lấy Id của nhân viên cần xóa
  $("#employeeTable").on("click", ".m-icon-delete", function () {
    //Lấy đối tượng
    let tr = $(this).closest("tr");
    let employee = tr.data("entity");
    //Lây Id của đối tượng
    employeeIDForDelete = employee.employeeId;
  });

  // Xóa nhân viên
  $("#btn-delete-employee").click(function () {
    console.log("delete");
    $(".m-loading").show();
    $.ajax({
      type: "DELETE",
      url: `http://localhost:5122/api/Employees/${employeeIDForDelete}`,
      success: async function (response) {
        $(".m-loading").hide();
        $(".m-warning").css("display", "none");
        await loadDataAndShowToast();
      },
      error: function (xhr, status, error) {
        $("#mToastError").fadeIn();
        setTimeout(function () {
          $("#mToastError").fadeOut();
        }, 12000);
      },
    });
  });
});

// Hàm load dữ liệu từ server
function loadData(callback) {
  $(".m-loading").show();
  $.ajax({
    type: "GET",
    url: "http://localhost:5122/api/Employees/",

    success: function (employees) {
      const $tbody = $("#employeeTable tbody").empty(); // Xóa các hàng hiện có

      employees.forEach((employee, index) => {
        let employeeCode = employee.employeeCode;
        let fullName = employee.fullName;
        let gender = employee.gender;
        let dob = employee.dateOfBirth;
        let email = employee.email;
        let address = employee.address;

        //Chính sửa ngày sinh
        if (dob) {
          dob = new Date(dob);
          let date = dob.getDate();
          let month = dob.getMonth() + 1;
          let year = dob.getFullYear();
          dob = `${date}/${month}/${year}`;
        }

        // Chỉnh sửa gender
        if (gender == "0") {
          gender = "Nam";
        } else if (gender == "1") {
          gender = "Nữ";
        } else if (gender == "2") {
          gender = "Khác";
        }
        const $row = $("<tr></tr>");
        $("<td></td>")
          .addClass("text-align-center")
          .text(index + 1)
          .appendTo($row);
        $("<td></td>")
          .addClass("text-align-left")
          .text(employeeCode)
          .appendTo($row);
        $("<td></td>")
          .addClass("text-align-left")
          .text(fullName)
          .appendTo($row);
        $("<td></td>").addClass("text-align-left").text(gender).appendTo($row);
        $("<td></td>").addClass("text-align-center").text(dob).appendTo($row);
        $("<td></td>").addClass("text-align-left").text(email).appendTo($row);
        $("<td></td>").addClass("text-align-left").text(address).appendTo($row);
        $("<td></td>")
          .html(
            '<div class="m-table-button"><button class="m-icon-edit"></button><button class="m-icon-delete"></button></div>'
          )
          .appendTo($row);
        $row.data("entity", employee);
        $tbody.append($row);
      });
      $(".m-loading").hide();
    },
    error: function (xhr, status, error) {
      console.error("Có lỗi xảy ra: " + error);
    },
  });
}

// Hàm tìm kiếm bảng nhân viên theo từ khóa
function searchTable() {
  var searchInput = $("#searchInput").val().toUpperCase();
  var tr = $("#employeeTable tr").slice(1);

  tr.each(function () {
    var td1 = $(this).find("td:eq(1)");
    var td2 = $(this).find("td:eq(2)");
    if (
      td1.text().toUpperCase().indexOf(searchInput) > -1 ||
      td2.text().toUpperCase().indexOf(searchInput) > -1
    ) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

// Hàm reset form
function resetForm() {
  $("#errorEmployeeCode").hide();
  $("#errorFullName").hide();
  $("#errorBirthDate").hide();
  $("#errorCMTND").hide();
  $("#errorNgayCap").hide();
  $("#errorDTDiDong").hide();
  $("#errorEmail").hide();
  $("#errorEmailValid").hide();
}

// Hàm kiểm tra tính hợp lệ của form thêm mới
function checkFormAddEmployee() {
  let isValid = true;
  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtEmployeeCode").blur(function () {
    let employeeCode = $(this).val();
    if (employeeCode == "" || employeeCode == null) {
      $(this).addClass("m-input-error");
      $("#errorEmployeeCode").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorEmployeeCode").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtFullName").blur(function () {
    let fullname = $(this).val();
    if (fullname == "" || fullname == null) {
      $(this).addClass("m-input-error");
      $("#errorFullName").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorFullName").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#dateDOB").blur(function () {
    let birthDateStr = $(this).val();
    let birthDate = new Date(birthDateStr);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (birthDate > currentDate) {
      $(this).addClass("m-input-error");
      $("#errorBirthDate").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorBirthDate").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtCMTND").blur(function () {
    let cmtnd = $(this).val();
    if (cmtnd == "" || cmtnd == null) {
      $(this).addClass("m-input-error");
      $("#errorCMTND").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorCMTND").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtNgayCap").blur(function () {
    let ngay_cap_str = $(this).val();
    let ngay_cap = new Date(ngay_cap_str);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (ngay_cap > currentDate) {
      $(this).addClass("m-input-error");
      $("#errorNgayCap").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorNgayCap").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtDTDiDong").blur(function () {
    let sdt = $(this).val();
    if (sdt == "" || sdt == null) {
      $(this).addClass("m-input-error");
      $("#errorDTDiDong").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorDTDiDong").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtEmail").blur(function () {
    let email = $(this).val();
    if (email == "" || email == null) {
      $(this).addClass("m-input-error");
      $("#errorEmail").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorEmail").hide();
    }
  });

  // Kiểm tra tính hợp lệ của form thêm mới
  $("#txtEmail").blur(function () {
    let email = $(this).val();

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email != "" && email != null && !emailRegex.test(email)) {
      $(this).addClass("m-input-error");
      $("#errorEmailValid").show();
      isValid = false;
    } else {
      $(this).removeClass("m-input-error");
      $("#errorEmailValid").hide();
    }
  });

  return isValid;
}

// Hàm hiển thị thông báo
function hideToast() {
  $("#mToastSuccess").hide();
  $("#mToastError").hide();
  $("#mToastInvalid").hide();
}

// Hàm load dữ liệu và hiển thị thông báo
async function loadDataAndShowToast() {
  await loadData();
  $("#mToastSuccess").fadeIn();
  setTimeout(function () {
    $("#mToastSuccess").fadeOut();
  }, 12000);
}
