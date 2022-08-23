import { Person } from 'src/app/features/models/person.model';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MockModule } from "ng-mocks";

import { DataService } from "./data.service";
import { HttpClientModule } from '@angular/common/http';

fdescribe('DataService', () => {
    let service: DataService;    
    let httpController: HttpTestingController
    const mockResp: Person[] = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MockModule(HttpClientModule),
                HttpClientTestingModule
            ],
            providers: []
        });
        service = TestBed.inject(DataService);
        httpController = TestBed.inject(HttpTestingController)
    });

    it('should be create', () => {
        expect(service).toBeTruthy();
    });

    it('Petición de usuarios', () => {
        service.getUsers()
        .subscribe((persons) => expect(persons).toEqual(mockResp))
        const req = httpController.expectOne({method: 'GET', url: 'https://62ce1595a43bf78008624d8e.mockapi.io/api/v1/person'})
        req.flush(mockResp)
    });
})