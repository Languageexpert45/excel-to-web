const inputData = document.querySelector(".fileReader");
const tableWrapper = document.querySelector(".uk-table");
const table_button = document.querySelector(".table_button");

function handleFile(e) {
  const files = e.target.files,
    f = files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;
    const excelObj = XLSX.read(data, { type: "binary" });
    const sheetName = excelObj.Workbook.Sheets[0].name

    const html = XLSX.utils.sheet_to_html(excelObj.Sheets[sheetName]);
    tableWrapper.insertAdjacentHTML("beforeend", html);
    tableWrapper.addEventListener('click', (e) => {
       e.target.setAttribute("contenteditable", "true");
       
    })
    tableWrapper.addEventListener("keyup", (e) => {
      e.target.dataset.v = e.target.textContent;
    });


    table_button.addEventListener("click", (e) => {
      const wb = XLSX.utils.table_to_book(tableWrapper);
      XLSX.writeFile(wb, "SheetJSTable.xlsx");
    });
  };
  reader.readAsBinaryString(f);
}
inputData.addEventListener("change", handleFile, false);
