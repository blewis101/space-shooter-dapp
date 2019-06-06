class Model
{
    constructor()
    {
        this._score = 0;
        this.soundOn = true;
        this._musicOn = true;
        this._musicOff = true;
    }
    set musicOn(val)
    {
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn()
    {
        return this._musicOn;
    }
    set musicOff(val)
    {
        this._musicOff = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOff()
    {
        return this._musicOff;
    }
    set score(val)
    {
        this._score = val;
        //console.log("The score has been updated!");
        emitter.emit(G.SCORE_UPDATED);
    }
    get score()
    {
        return this._score;
    }

}