import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()

export class FormSelectionService{
    private selectionFormSource = new BehaviorSubject<string>("Add purchase")
    selectedForm$ = this.selectionFormSource.asObservable()

    setSelectedForm(formName: string){
        this.selectionFormSource.next(formName)
    }
}