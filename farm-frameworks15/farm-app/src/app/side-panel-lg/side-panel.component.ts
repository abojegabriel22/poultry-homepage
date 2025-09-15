
import { Component, OnInit } from "@angular/core"
import { BatchSelectionService } from "../services/batch-selection.service"
import { FormSelectionService } from "../services/form-selection.service"

@Component({
    selector: 'app-side-panel-lg',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
    side_panel_batch = 'Name'

    constructor(
        private batchSelectionService: BatchSelectionService,
        private formSelectionService: FormSelectionService
    ){}

    ngOnInit(): void {
        this.batchSelectionService.selectedBatch$.subscribe(batch => {
            if(batch){
                this.side_panel_batch = batch.name
            }
        })
        // also restore from localStorage when browser refreshes
        const savedBatch = localStorage.getItem("selectedBatch")
        if(savedBatch){
            try{
                const parsed = JSON.parse(savedBatch)
                this.side_panel_batch = parsed.name
                this.batchSelectionService.setSelectedBatch(parsed) // rehydrate service
            } catch(err){
                console.error("Error parsing selectedBatch from storage: ", err)
            }
        }
    }
    selectedForm(name: string){
        this.formSelectionService.setSelectedForm(name)
    }
}