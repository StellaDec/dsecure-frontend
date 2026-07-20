const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/dashboards/AdminReports.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const UI_FIELDS = `
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Company
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.technicianCompany}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        technicianCompany: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Company
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.validatorCompany}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        validatorCompany: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Validate Inc"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Type
                </label>
                <input
                  type="text"
                  value={pdfFormData.productType}
                  onChange={(e) =>
                    setPdfFormData({
                      ...pdfFormData,
                      productType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="D-Secure System Cleaner"
                />
              </div>
`;

// Replace inputs
content = content.replace(
  /placeholder="Quality Assurance"\r?\n\s*\/>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\r?\n\s*{\/\* Logos \*\/}/g,
  `placeholder="Quality Assurance"\n                  />\n                </div>\n              </div>\n${UI_FIELDS}\n              {/* Logos */}`
);

content = content.replace(
  /placeholder="QA Department"\r?\n\s*\/>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\r?\n\s*{\/\* Logo Uploads \*\/}/g,
  `placeholder="QA Department"\n                  />\n                </div>\n              </div>\n${UI_FIELDS}\n              {/* Logo Uploads */}`
);

// Add the Reset button next to the Save button
const RESET_BUTTON = `
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all settings to their defaults?")) {
                      setPdfFormData(defaultPdfSettings);
                      setImageBase64({
                        headerLeftLogo: null,
                        headerRightLogo: null,
                        watermarkImage: null,
                        technicianSignature: null,
                        validatorSignature: null,
                      });
                      localStorage.removeItem("pdfExportSettingsCache");
                    }
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors mr-2"
                >
                  Reset to Defaults
                </button>
`;

content = content.replace(
  /<button\r?\n\s*onClick=\{async \(\) => \{\r?\n\s*if \(isDemo\) \{/g,
  `${RESET_BUTTON}\n                <button\n                  onClick={async () => {\n                    if (isDemo) {`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('UI Patched!');
