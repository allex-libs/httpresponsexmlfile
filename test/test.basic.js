var xml2js = require('xml2js');

var _expnooptions = '<?xml version="1.0"?><root><rows><fields name="Row">0</fields><fields name="Field 1">fld1 in row 0</fields><fields name="Field 2">fld2 in row0</fields></rows><rows><fields name="Row">1</fields><fields name="Field 1">fld1 in row 1</fields><fields name="Field 2">fld2 in row1</fields></rows><rows><fields name="Row">2</fields><fields name="Field 1">fld1 in row 2</fields><fields name="Field 2">fld2 in row2</fields></rows><rows><fields name="Row">3</fields><fields name="Field 1">fld1 in row 3</fields><fields name="Field 2">fld2 in row3</fields></rows><rows><fields name="Row">4</fields><fields name="Field 1">fld1 in row 4</fields><fields name="Field 2">fld2 in row4</fields></rows><rows><fields name="Row">5</fields><fields name="Field 1">fld1 in row 5</fields><fields name="Field 2">fld2 in row5</fields></rows><rows><fields name="Row">6</fields><fields name="Field 1">fld1 in row 6</fields><fields name="Field 2">fld2 in row6</fields></rows><rows><fields name="Row">7</fields><fields name="Field 1">fld1 in row 7</fields><fields name="Field 2">fld2 in row7</fields></rows><rows><fields name="Row">8</fields><fields name="Field 1">fld1 in row 8</fields><fields name="Field 2">fld2 in row8</fields></rows><rows><fields name="Row">9</fields><fields name="Field 1">fld1 in row 9</fields><fields name="Field 2">fld2 in row9</fields></rows></root>';

var _expwithoptions = '<?xml version="1.0"?><collection><lines><cells title="Row">0</cells><cells title="Field 1">fld1 in row 0</cells><cells title="Field 2">fld2 in row0</cells></lines><lines><cells title="Row">1</cells><cells title="Field 1">fld1 in row 1</cells><cells title="Field 2">fld2 in row1</cells></lines><lines><cells title="Row">2</cells><cells title="Field 1">fld1 in row 2</cells><cells title="Field 2">fld2 in row2</cells></lines><lines><cells title="Row">3</cells><cells title="Field 1">fld1 in row 3</cells><cells title="Field 2">fld2 in row3</cells></lines><lines><cells title="Row">4</cells><cells title="Field 1">fld1 in row 4</cells><cells title="Field 2">fld2 in row4</cells></lines><lines><cells title="Row">5</cells><cells title="Field 1">fld1 in row 5</cells><cells title="Field 2">fld2 in row5</cells></lines><lines><cells title="Row">6</cells><cells title="Field 1">fld1 in row 6</cells><cells title="Field 2">fld2 in row6</cells></lines><lines><cells title="Row">7</cells><cells title="Field 1">fld1 in row 7</cells><cells title="Field 2">fld2 in row7</cells></lines><lines><cells title="Row">8</cells><cells title="Field 1">fld1 in row 8</cells><cells title="Field 2">fld2 in row8</cells></lines><lines><cells title="Row">9</cells><cells title="Field 1">fld1 in row 9</cells><cells title="Field 2">fld2 in row9</cells></lines></collection>';

describe('Test XML file generation', function () {
  it('Load Lib', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  loadMochaIntegration('allex_httpresponsefiledatamixinlib');
  HttpResponseFileFromDataTest(function () {
    return Lib.XmlFile;
  }, _expnooptions);
  HttpResponseFileFromDataTest(function () {
    return Lib.XmlFile;
  }, _expwithoptions, {pretty: false, documentname: 'collection', rowsname: 'lines', fieldsname: 'cells', fieldnamename: 'title', fieldvaluename: 'reading'});
  HttpResponseFileFromDataTest(function () {
    return Lib.XmlFile;
  }, require('./obj.json'), null, function (res) {
    return xml2js.parseStringPromise(res);
  });
});
