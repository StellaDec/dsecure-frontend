const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/dashboards/AdminReports.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update defaultPdfSettings
content = content.replace(
  /validatorDept:\s*"",\r?\n\s*headerLeftLogo:/g,
  'validatorDept: "",\n    productType: "",\n    technicianCompany: "",\n    validatorCompany: "",\n    headerLeftLogo:'
);

// 2. Update pdfFormData State Type
content = content.replace(
  /validatorDept:\s*string;\r?\n\s*headerLeftLogo:/g,
  'validatorDept: string;\n    productType: string;\n    technicianCompany: string;\n    validatorCompany: string;\n    headerLeftLogo:'
);

// 3. loadSavedSettings - parsed data cache applying
content = content.replace(
  /validatorDept:\s*parsed\.validatorDept\s*\|\|\s*"",\r?\n\s*headerLeftLogo:/g,
  'validatorDept: parsed.validatorDept || "",\n              productType: parsed.productType || "",\n              technicianCompany: parsed.technicianCompany || "",\n              validatorCompany: parsed.validatorCompany || "",\n              headerLeftLogo:'
);

// 4. loadSavedSettings - API response mapping
content = content.replace(
  /validatorDept:\r?\n\s*savedSettings\.validatorDept\s*\|\|\r?\n\s*savedSettings\.ValidatorDept\s*\|\|\r?\n\s*"",\r?\n\s*\};\r?\n\s*\} else/g,
  'validatorDept:\n                savedSettings.validatorDept ||\n                savedSettings.ValidatorDept ||\n                "",\n              productType:\n                savedSettings.productType ||\n                savedSettings.ProductType ||\n                "",\n              technicianCompany:\n                savedSettings.technicianCompany ||\n                savedSettings.TechnicianCompany ||\n                "",\n              validatorCompany:\n                savedSettings.validatorCompany ||\n                savedSettings.ValidatorCompany ||\n                "",\n            };\n          } else'
);

// 5. FormData appends in savePdfSettingsToServer
content = content.replace(
  /formData\.append\("validatorDept",\s*pdfFormData\.validatorDept\);\r?\n\r?\n\s*\/\/\s*Include base64 images if available/g,
  'formData.append("validatorDept", pdfFormData.validatorDept);\n      formData.append("productType", pdfFormData.productType);\n      formData.append("technicianCompany", pdfFormData.technicianCompany);\n      formData.append("validatorCompany", pdfFormData.validatorCompany);\n\n      // Include base64 images if available'
);

// 6. Cache data creations (there are multiple places: line 853, 921, 1016)
content = content.replace(
  /validatorDept:\s*pdfFormData\.validatorDept,\r?\n\s*images:/g,
  'validatorDept: pdfFormData.validatorDept,\n            productType: pdfFormData.productType,\n            technicianCompany: pdfFormData.technicianCompany,\n            validatorCompany: pdfFormData.validatorCompany,\n            images:'
);

// 7. Array dependencies for savePdfSettingsToServer
content = content.replace(
  /pdfFormData\.validatorDept,\r?\n\s*imageBase64,\r?\n\s*\]\);/g,
  'pdfFormData.validatorDept,\n    pdfFormData.productType,\n    pdfFormData.technicianCompany,\n    pdfFormData.validatorCompany,\n    imageBase64,\n  ]);'
);

// 8. Submit data for generating pdf (1939, 2117, 2407)
content = content.replace(
  /submitData\.append\("validatorDept",\s*pdfFormData\.validatorDept\);\r?\n\r?\n\s*\/\/\s*Add file fields/g,
  'submitData.append("validatorDept", pdfFormData.validatorDept);\n      submitData.append("productType", pdfFormData.productType);\n      submitData.append("technicianCompany", pdfFormData.technicianCompany);\n      submitData.append("validatorCompany", pdfFormData.validatorCompany);\n\n      // Add file fields'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replacements done!');
