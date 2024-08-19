const departments = [
  { departmentID: "04b4f0c7-5246-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Tài chính" },
  { departmentID: "3304dddb-1b72-607f-25c2-579daad24557", departmentName: "Phòng Công Nghệ Thông Tin" },
  { departmentID: "39d8f18e-523a-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Marketing" },
  { departmentID: "49253bd8-5238-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Đào Tạo" },
  { departmentID: "531dfa0f-5245-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Nhân Sự" },
  { departmentID: "57cdf8c4-47e3-5560-7e41-c1ec321fe728", departmentName: "Phòng Nghiên cứu và Phát triển" },
  { departmentID: "740b2743-5236-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Hành Chính" },
  { departmentID: "804df570-5239-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Kinh Doanh" },
  { departmentID: "a5a6d3a1-5238-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Kế Toán" },
  { departmentID: "ab14971d-5245-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Chất Lượng" },
  { departmentID: "cb7f509c-5237-11ef-9fd0-00163e0c7f26", departmentName: "Phòng Văn Phòng" }
];

const positions = [
  { positionID: "11452b0c-768e-5ff7-0d63-eeb1d8ed8cef", positionName: "Thực tập sinh" },
  { positionID: "142cb08f-7c31-21fa-8e90-67245e8b283e", positionName: "Nhân viên" },
  { positionID: "17120d02-6ab5-3e43-18cb-66948daf6128", positionName: "Phó phòng" },
  { positionID: "469b3ece-744a-45d5-957d-e8c757976496", positionName: "Team Leader" },
  { positionID: "4e272fc4-7875-78d6-7d32-6a1673ffca7c", positionName: "Trưởng phòng" }
];


$(document).ready(function () {
  var formMode = "edit";
  var employeeIDForEdit = null;
  var employeeIDForDelete = null;
  hideToast();
  //Hien thi loading
  loadData();

  $("#searchInput").on("keyup", searchTable);
  //dong mo navbar
  $(".sibar").click(function () {
    $(".navbar").toggleClass("active");
  });

  $("#btnThuGon").click(function () {
    $(".navbar").toggleClass("active");
  });
  //xoa form
  $(this).on("click", ".m-icon-delete", function () {
    $(".m-warning").css("display", "block");
  });

  $("#employeeTable").on("click", ".m-icon-edit", function () {
    formMode = "edit";
    //lay doi tuong
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
    //

    const department = departments.find(dept => dept.departmentID === employee.departmentId);
    const position = positions.find(pos => pos.positionID === employee.positionId);

    employeeIDForEdit = employee.employeeId;
    console.log(employeeIDForEdit);
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

  //dong form
  $(".m-button-close, .m-button-cancel").click(function () {
    $(".m-warning").hide();
  });

  $(".m-toast-close").click(function () {
    $(".m-toast-box").hide();
  });
  //mo form
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

  $("#btnCancelAddEm").click(function () {
    $(".m-add-employee.m-dialog").hide();
  });

  $("#btn_close_employee").click(function () {
    $(".m-add-employee.m-dialog").hide();
  });

  checkFormAddEmployee();
  //validate form
  $("#btnDialogSave").click(function () {
    let employeeId = employeeIDForEdit;
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

    let selectedPosition = positions.find(position => position.positionName === vi_tri);
    let vi_tri_id = selectedPosition ? selectedPosition.positionID : null;
    let vi_tri_uuid = vi_tri_id ? uuid.v4(vi_tri_id) : null;

    let selectedDepartment = departments.find(department => department.departmentName === phong_ban);
    let departmentId = selectedDepartment ? selectedDepartment.departmentID : null;
    let departmentIdUuid = departmentId ? uuid.v4(departmentId) : null;

    let employeeIdUuid = employeeId ? uuid.v4(employeeId) : null;
    console.log(employeeIDForEdit);
    let employee = {
      employeeId: employeeIDForEdit,
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
          url: `https://localhost:7182/api/Employees/${employeeIDForEdit}`,
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
          url: "https://cukcuk.manhnv.net/api/v1/Employees/",
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

  $("#employeeTable").on("click", ".m-icon-delete", function () {
    //lay doi tuong
    let tr = $(this).closest("tr");
    let employee = tr.data("entity");
    //ngay sinh
    employeeIDForDelete = employee.employeeId;
  });

  $("#btn-delete-employee").click(function () {
    console.log("delete");
    $(".m-loading").show();
    $.ajax({
      type: "DELETE",
      url: `https://cukcuk.manhnv.net/api/v1/Employees/${employeeIDForDelete}`,
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

function loadData(callback) {
  $(".m-loading").show();
  $.ajax({
    type: "GET",
    url: "https://localhost:7182/api/Employees",

    success: function (employees) {
      const $tbody = $("#employeeTable tbody").empty(); // Xóa các hàng hiện có

      employees.forEach((employee, index) => {
        let employeeCode = employee.employeeCode;
        let fullName = employee.fullName;
        let gender = employee.gender;
        let dob = employee.dateOfBirth;
        let email = employee.email;
        let address = employee.address;

        //chinh sua dob
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

function checkFormAddEmployee() {
  let isValid = true;
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

function hideToast() {
  $("#mToastSuccess").hide();
  $("#mToastError").hide();
  $("#mToastInvalid").hide();
}

async function loadDataAndShowToast() {
  await loadData();
  $("#mToastSuccess").fadeIn();
  setTimeout(function () {
    $("#mToastSuccess").fadeOut();
  }, 12000);
}
