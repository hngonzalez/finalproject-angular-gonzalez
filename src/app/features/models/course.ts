export class Course {
    idCourse?: number;
    name?: string;
    idClassroom?: number;
    
    constructor(idCourse?: number, name?:string, idClassroom?: number) {
        this.idCourse = idCourse;
        this.name = name;
        this.idClassroom = idClassroom;
    }
}
