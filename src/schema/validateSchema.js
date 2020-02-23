'use strict';
var validate = (function() {
  var refVal = [];
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict';
    var vErrors = null;
    var errors = 0;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      var errs__0 = errors;
      var valid1 = true;
      var data1 = data.bookmarks;
      if (data1 === undefined) {
        valid1 = false;
        var err = {
          keyword: 'required',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/required',
          params: {
            missingProperty: 'bookmarks'
          },
          message: 'should have required property \'bookmarks\''
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      } else {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
              var errs__2 = errors;
              var valid3 = true;
              if (data2.name === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.bookmarks[' + i1 + ']',
                  schemaPath: '#/properties/bookmarks/items/required',
                  params: {
                    missingProperty: 'name'
                  },
                  message: 'should have required property \'name\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.name !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.bookmarks[' + i1 + '].name',
                    schemaPath: '#/properties/bookmarks/items/properties/name/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (data2.bookmarkId === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.bookmarks[' + i1 + ']',
                  schemaPath: '#/properties/bookmarks/items/required',
                  params: {
                    missingProperty: 'bookmarkId'
                  },
                  message: 'should have required property \'bookmarkId\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.bookmarkId !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.bookmarks[' + i1 + '].bookmarkId',
                    schemaPath: '#/properties/bookmarks/items/properties/bookmarkId/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              var data3 = data2.parentFolderId;
              if (data3 === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.bookmarks[' + i1 + ']',
                  schemaPath: '#/properties/bookmarks/items/required',
                  params: {
                    missingProperty: 'parentFolderId'
                  },
                  message: 'should have required property \'parentFolderId\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data3 !== "string" && data3 !== null) {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.bookmarks[' + i1 + '].parentFolderId',
                    schemaPath: '#/properties/bookmarks/items/properties/parentFolderId/type',
                    params: {
                      type: 'string,null'
                    },
                    message: 'should be string,null'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (data2.url === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.bookmarks[' + i1 + ']',
                  schemaPath: '#/properties/bookmarks/items/required',
                  params: {
                    missingProperty: 'url'
                  },
                  message: 'should have required property \'url\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.url !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.bookmarks[' + i1 + '].url',
                    schemaPath: '#/properties/bookmarks/items/properties/url/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.bookmarks[' + i1 + ']',
                schemaPath: '#/properties/bookmarks/items/type',
                params: {
                  type: 'object'
                },
                message: 'should be object'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.bookmarks',
            schemaPath: '#/properties/bookmarks/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.folders;
      if (data1 === undefined) {
        valid1 = false;
        var err = {
          keyword: 'required',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/required',
          params: {
            missingProperty: 'folders'
          },
          message: 'should have required property \'folders\''
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      } else {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
              var errs__2 = errors;
              var valid3 = true;
              if (data2.name === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                  schemaPath: '#/properties/folders/items/required',
                  params: {
                    missingProperty: 'name'
                  },
                  message: 'should have required property \'name\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.name !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.folders[' + i1 + '].name',
                    schemaPath: '#/properties/folders/items/properties/name/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (data2.folderId === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                  schemaPath: '#/properties/folders/items/required',
                  params: {
                    missingProperty: 'folderId'
                  },
                  message: 'should have required property \'folderId\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.folderId !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.folders[' + i1 + '].folderId',
                    schemaPath: '#/properties/folders/items/properties/folderId/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              var data3 = data2.parentFolderId;
              if (data3 === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                  schemaPath: '#/properties/folders/items/required',
                  params: {
                    missingProperty: 'parentFolderId'
                  },
                  message: 'should have required property \'parentFolderId\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data3 !== "string" && data3 !== null) {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.folders[' + i1 + '].parentFolderId',
                    schemaPath: '#/properties/folders/items/properties/parentFolderId/type',
                    params: {
                      type: 'string,null'
                    },
                    message: 'should be string,null'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              var data3 = data2.childrenFolders;
              if (data3 === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                  schemaPath: '#/properties/folders/items/required',
                  params: {
                    missingProperty: 'childrenFolders'
                  },
                  message: 'should have required property \'childrenFolders\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (Array.isArray(data3)) {
                  var errs__3 = errors;
                  var valid3;
                  for (var i3 = 0; i3 < data3.length; i3++) {
                    var errs_4 = errors;
                    if (typeof data3[i3] !== "string") {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.folders[' + i1 + '].childrenFolders[' + i3 + ']',
                        schemaPath: '#/properties/folders/items/properties/childrenFolders/items/type',
                        params: {
                          type: 'string'
                        },
                        message: 'should be string'
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var valid4 = errors === errs_4;
                  }
                } else {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.folders[' + i1 + '].childrenFolders',
                    schemaPath: '#/properties/folders/items/properties/childrenFolders/type',
                    params: {
                      type: 'array'
                    },
                    message: 'should be array'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              var data3 = data2.childrenBookmarks;
              if (data3 === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                  schemaPath: '#/properties/folders/items/required',
                  params: {
                    missingProperty: 'childrenBookmarks'
                  },
                  message: 'should have required property \'childrenBookmarks\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (Array.isArray(data3)) {
                  var errs__3 = errors;
                  var valid3;
                  for (var i3 = 0; i3 < data3.length; i3++) {
                    var errs_4 = errors;
                    if (typeof data3[i3] !== "string") {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.folders[' + i1 + '].childrenBookmarks[' + i3 + ']',
                        schemaPath: '#/properties/folders/items/properties/childrenBookmarks/items/type',
                        params: {
                          type: 'string'
                        },
                        message: 'should be string'
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var valid4 = errors === errs_4;
                  }
                } else {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.folders[' + i1 + '].childrenBookmarks',
                    schemaPath: '#/properties/folders/items/properties/childrenBookmarks/type',
                    params: {
                      type: 'array'
                    },
                    message: 'should be array'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.folders[' + i1 + ']',
                schemaPath: '#/properties/folders/items/type',
                params: {
                  type: 'object'
                },
                message: 'should be object'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.folders',
            schemaPath: '#/properties/folders/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "properties": {
    "bookmarks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "bookmarkId": {
            "type": "string"
          },
          "parentFolderId": {
            "type": ["string", "null"]
          },
          "url": {
            "type": "string"
          }
        },
        "required": ["name", "bookmarkId", "parentFolderId", "url"]
      }
    },
    "folders": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "folderId": {
            "type": "string"
          },
          "parentFolderId": {
            "type": ["string", "null"]
          },
          "childrenFolders": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "childrenBookmarks": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": ["name", "folderId", "parentFolderId", "childrenFolders", "childrenBookmarks"]
      }
    }
  },
  "required": ["folders", "bookmarks"]
};
validate.errors = null;
module.exports = validate;