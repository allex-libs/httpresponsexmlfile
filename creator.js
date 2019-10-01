var xmlbuilder = require('xmlbuilder');
function createXmlFile (execlib, httpresponsefilelib, datamixinlib) {
  'use strict';

  var lib = execlib.lib,
    DynamicFile = httpresponsefilelib.DynamicFile,
    HttpResponseFileDataMixin = datamixinlib.Mixin,
    ContentsFromDataProducer = HttpResponseFileDataMixin.prototype.ContentsFromDataProducer;


  function XmlFromDataProducer (file, datafields, options) {
    ContentsFromDataProducer.call(this, file, datafields, options||{});
  }
  lib.inherit(XmlFromDataProducer, ContentsFromDataProducer);
  XmlFromDataProducer.prototype.initialData = function () {
    return xmlbuilder.create(this.options.documentname || 'root');
  };
  XmlFromDataProducer.prototype.produceRow = function (dataobject) {
    this.datafields.reduce(this.onDataField.bind(this, dataobject), this.data.ele(this.options.rowsname || 'rows'));
  };
  XmlFromDataProducer.prototype.onDataField = function (dataobject, result, datafield) {
    var fieldname = datafield[this.file.headerNameFieldName],
      val = dataobject[fieldname],
      fieldele = result.ele(this.options.fieldsname || 'fields');
    fieldele.att(this.options.fieldnamename || 'name', this.file.headerName(datafield));
    fieldele.txt(val);
    //result.att(this.file.headerName(datafield), val);
    return result;
  };
  XmlFromDataProducer.prototype.finalize = function () {
    if (!lib.isString(this.data)) {
      this.data = this.data.end({pretty: this.options.pretty});
    }
  };

  function XmlFile (filename, destroyables) {
    DynamicFile.call(this, filename, destroyables);
    HttpResponseFileDataMixin.call(this);
  }
  lib.inherit(XmlFile, DynamicFile);
  HttpResponseFileDataMixin.addMethods(XmlFile);
  XmlFile.prototype.destroy = function () {
    HttpResponseFileDataMixin.prototype.destroy.call(this);
    DynamicFile.prototype.destroy.call(this);
  };
  XmlFile.prototype.contentType = function () {
    return 'text/xml';
  };
  XmlFile.prototype.ContentsFromDataProducer = XmlFromDataProducer;

  return {
    XmlFile: XmlFile
  };
}

module.exports = createXmlFile;
