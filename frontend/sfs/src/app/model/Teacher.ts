export class Teacher{
    public teacherId: number;
    public name: string;
    public rating: number;
    public isSurvayDone: boolean;

    constructor(){
        [this.teacherId, this.rating, this.name] = [0,0, ''];
        this.isSurvayDone = false;
    }
}