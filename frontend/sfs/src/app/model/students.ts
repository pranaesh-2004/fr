export class Students{
    public name: string | undefined;
    public rollNo: number = 0;
    public password: string | undefined;
    public hasGivenFeedback: boolean;

    constructor(){
        this.name = '';
        this.password = '';
        this.hasGivenFeedback = false;
    }
}