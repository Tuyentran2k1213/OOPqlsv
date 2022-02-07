function SV(_idsv, _namesv, _mailsv, _passsv, _mathsv, _physv, _chemsv){
    this.idsv = _idsv;
    this.namesv = _namesv;
    this.mailsv = _mailsv;
    this.passsv = _passsv;
    this.mathsv = _mathsv;
    this.physv = _physv;
    this.chemsv = _chemsv;
    this.getAverage = function(){
        return ((this.mathsv + this.physv + this.chemsv) / 3).toFixed(2);
    }
}