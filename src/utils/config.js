const CONFIGS = {
  DEFAULT_CANVAS_WIDTH: 600,
  DEFAULT_CANVAS_HEIGHT: 600,
  DEFAULT_CANVAS_OUTLINE:5,
  DEFAULT_IMG_URL: 'data:image/bmp;base64,Qk0OcQAAAAAAAD4AAAAoAAAAUAIAAHwBAAABAAEAAAAAANBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA////////////////////j////z////////////////////////////////+/+B//A///H///z/////////////////////////8AAP///////////////////4H///A//////////wAP///////////4AAAAAAD/n/gf/wP//wP//wf/////////////////////////AAD///////////////////8AP/+AH4AAAAAAD/8AA///////////+AAAAAAA/wf4AAAD//4A//wH/////////////////////////wAA///////////////////+AA/+AB+AAAAAAA/+AAH///////////gAAAAAAP4D+AAAA/48AH/4A/////////////////////////8AAP//////////////////ngAD+AAPgAAAAAAP/gAA///////////4AAAAAAD+AfgAAAP8HAAf8AP/////////////////////////AAD//////////////////4wAAOAAB4AAAAAAD/4AAH//////////+AAAAAAA/gD4AAAD+AwAD+AB/////////////////////////wAA//////////////////+HwAAAAAeAAAAAAA/+AAB///////////gAAAAAAP8AOAAAA/gHwAfAB/////////////////////////8AAP//////////////////g/gAAAB/gAAAAAAP/n8Af///////////////////ABgf/wP4A/ADgD//////////////////////////AAD//////////////////wH+AAAH////8B//////gH///////////////////wAYH/8D+AH8AwD//////////////////////////wAA//////////////////8A/8AAP/////Af/////8B///////////////////8AGB//A/wB/gAB//////////////////////////8AAP//////////////////AH/wAP/////wH//////Af///////////////////ABgAAAP8Af+AB///////////////////////////AAD//////////////////wB/4AB/////8B//////wH///////////wAAAAAH/wIYAAAD/AP/gA///////////////////////////wAA//////////////////+AP8AAP/////Af/////8B///////////8AAAAAB/8DGAAAA/wCAAAAAf////////////////////////8AAP//////////////////wB+AAB/////wH//////Af///////////AAAAAAf/A/gAAAP8CgAAAAH/////////////////////////AAD//////////////////+APAOAP////8B//////wH///////////wAAAAAH/wP4AAAD/A4AAAAB/////////////////////////wAA///////////////////wDgHwD/////Af/////8B///////////8AAAAAB/8D+B//A/wOAAAAAf////////////////////////8AAP//////////////////+AYD+Af//AAAAAD////Af///////////gAAAAAfgABgf/wP8DgAAAAH/////////////////////////AAD///////////////////wAB/wD//wAAAAA////wH//////////////////4AAYH/8D/A//8H///////////////////////////wAA///////////////////8AAf+Af/8AAAAAP///8B//////////////////+AAGAAAA/wP//A///////////////////////////8AAP///////////////////gAP/wH/3AAAAAD////Af//4AAAAAAA4B///AAfgABgAAAP8D//wP///////////////////////////AAD///////////////////8AH/+A/5wAAAAA////wH//+AAAAAAAMAAD/gAB4AAYAAAD/A//8D///////////////////////////wAA////////////////////AAAAAP+MAAAAAP///8B///gAAAAAADAAAA4AAf8D+AAAA/wPgAAAA/////////////////////////8AAP///////////////////4AAAAD/h//wH//////Af//4AAAAAAAwAAAMAAD/A/gAAAP8D4AAAAP/////////////////////////AAD////////////////////AAAAA/wf/8B//////wH//+AAAAAAAMAAADAAA/wP//////A+AAAAD/////////////////////////wAA////////////////////wAAAAP8D//Af/////8B///gAAAAAADAAAAwPgPcD/////8APgAAAA/////////////////////////8AAP///////////////////+AAAAD+A//wH//////AH//4AAAAAAA+BgAMH8BzA//////AD4AAAAP/////////////////////////AAD////////////////////gP////gH/8B//////wA///////////geDzB/gcAAwAAAAwA///////////////////////////////wAA////////////////////8B////8A//Af/////+AH//////////4Hg/wf4GAAMAAAAMAP//////////////////////////////8AAP////////////////////Af////AP/wH//////wAf/////////+B4P8H+BgADAAAADAD///////////////////////////////AAD////////////////////4H////4B/8B//////+AD//////////geD/B/h4AAwAAAAwA/AAAAH/////////////////////////wAA///////////////////AAAAAAAfAAAAAAD////4Af/////////4Hg/wP5+AAMAAAAP//wAAAB/////////////////////////8AAP//////////////////wAAAAAAHwAAAAAA/////AB/////////+B4P8A//gf/+B+B///8AAAAf/////////////////////////AAD//////////////////8AAAAAAB+AAAAAAP////8AP/////////geD/AD/8D//gfgf///AAAAH/////////////////////////wAA///////////////////AAAAAAAfgAAAAAD/////gA/////////4HgAwAP/A//4H4H///wAAAB/////////////////////////8AAP//////////////////wAAAAAAH8AAAAAA/////8AH////////+B4AMAA/4AD+B+B//H8D//gf/////////////////////////AAD//////////////////8AAAAAAB/AAAAAAP/////wA/////////geADAAD+AAYAAAB/gfA//4H/////////////////////////wAA///////////////////A/gP/w//4D/Af//8AAAAAAH////////4HgAwAAPgAGAAAAf4DwP/+B/////////////////////////8AAP//////////////////wP4D/4H/+A/wH//+AAAAAAB////////+B4AMGAH8ABgAAAH8A8D//gf/////////////////////////AAD//////////////////8B+A/8A//gH8B///gAAAAAAf////////geD/B4B/AAYAAAB/AfAAAAH/////////////////////////wAA///////////////////gfwP+AP/8B/Af//4AAAAAAH////////4Hg/wfg/wAOAAAAfgHwAAAB/////////////////////////8AAP//////////////////4H8D/AH//AfwH//+AAAAAAB////////+B4P8H+f+D/+B+B/wD8AAAAf/////////////////////////AAD//////////////////+A/AfwH//wH8B///gAAAAAAf////////geD/B///g//gfgf8B/AAAAH/////////////////////////wAA///////////////////gPwH+D//+P/Af//4AAAAAAH//////////g/wf//4H/4H4H/AfwAAAB/////////////////////////8AAP//////////////////8f+B/x/////wH////////////////////4P8H//+B/+B+B/8P///////////////////////////////AAD/////////////////////gf+/////8B////////////////////+D/B///w//gfgf/3///////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAP//////////////////////////////////////////////////////////////////////////////////////////////////AAD//////////////////////////////////////////////////////////////////////////////////////////////////wAA//////////////////////////////////////////////////////////////////////////////////////////////////8AAA=='
}

const POSITIONS = {
  top: 'TOP',
  right: 'RIGHT',
  bottom: 'BOTTOM',
  left: 'LEFT',
  topRight:'TOP_RIGHT',
  topLeft:'TOP_LEFT',
  bottomRight:'BOTTOM_RIGHT',
  bottomLeft:'BOTTOM_LEFT',
}

const STATUS = {
  NO_RE: -1,
  START: 0,
  DURING: 1,
  END: 2,
}

const PEN_TYPE = {
  PEN: 'pen',
  RECTANGLE_STROKE: 'rectangle',
  TEXT: 'text',
}

export { CONFIGS, POSITIONS, STATUS, PEN_TYPE }