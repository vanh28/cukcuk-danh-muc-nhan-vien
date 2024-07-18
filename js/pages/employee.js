$(document).ready(function () {
  var formMode = "edit";
  var employeeIDForEdit = null;
  var employeeIDForDelete = null;
  //Hien thi loading
  hideToast();
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
    if (employee.DateOfBirth) {
      newDOB = new Date(employee.DateOfBirth);
      let date = newDOB.getDate();
      let month = newDOB.getMonth() + 1;
      let year = newDOB.getFullYear();
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      newDOB = `${year}-${month}-${date}`;
    }

    let ngay_cap = "";
    if (employee.IdentityDate) {
      ngay_cap = new Date(employee.IdentityDate);
      let ngay_cap_date = ngay_cap.getDate();
      let ngay_cap_month = ngay_cap.getMonth() + 1;
      let ngay_cap_year = ngay_cap.getFullYear();
      ngay_cap_month =
        ngay_cap_month < 10 ? "0" + ngay_cap_month : ngay_cap_month;
      ngay_cap_date = ngay_cap_date < 10 ? "0" + ngay_cap_date : ngay_cap_date;
      ngay_cap = `${ngay_cap_year}-${ngay_cap_month}-${ngay_cap_date}`;
    }
    //
    employeeIDForEdit = employee.EmployeeId;
    $("#txtEmployeeCode").val(employee.EmployeeCode);
    $("#txtFullName").val(employee.FullName);
    $("#dateDOB").val(newDOB);
    $(
      "input[type='radio'][name='gioitinh'][value='" + employee.Gender + "']"
    ).prop("checked", true);
    $("#cbxViTri").val(employee.PositionName);
    $("#txtCMTND").val(employee.IdentityNumber);
    $("#txtNgayCap").val(ngay_cap);
    $("#cbxPhongBan").val(employee.DepartmentName);
    $("#txtNoiCap").val(employee.IdentityPlace);
    $("#txtDiaChi").val(employee.Address);
    $("#txtDTDiDong").val(employee.PhoneNumber);
    $("#txtDTCoDinh").val(employee.TeleNumber);
    $("#txtEmail").val(employee.Email);
    $("#txtTaiKhoanNH").val(employee.BankAccount);
    $("#txtTenNganHang").val(employee.BankName);
    $("#txtChiNhanh").val(employee.BranchName);
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
    let employee = {
      EmployeeCode: employeeCode,
      FullName: fullName,
      DateOfBirth: dob,
      Gender: genderName,
      PositionName: vi_tri,
      IdentityNumber: CMTND,
      IdentityDate: ngay_cap,
      DepartmentName: phong_ban,
      IdentityPlace: noi_cap,
      Address: dia_chi,
      PhoneNumber: DTDiDong,
      TeleNumber: DTCoDinh,
      Email: email,
      BankAccount: TaiKhoanNH,
      BankName: tenNH,
      BranchName: chiNhanh,
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
          url: `https://cukcuk.manhnv.net/api/v1/Employees/${employeeIDForEdit}`,
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
    employeeIDForDelete = employee.EmployeeId;
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
    url: "https://cukcuk.manhnv.net/api/v1/Employees",

    success: function (employees) {
      const $tbody = $("#employeeTable tbody").empty(); // Xóa các hàng hiện có

      employees.forEach((employee, index) => {
        let employeeCode = employee.EmployeeCode;
        let fullName = employee.FullName;
        let gender = employee.Gender;
        let dob = employee.DateOfBirth;
        let email = employee.Email;
        let address = employee.Address;

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
