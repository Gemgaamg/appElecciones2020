import { TestBed } from '@angular/core/testing';
import { HrzServerService } from './hrz-server.service';
describe('HrzServerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HrzServerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=hrz-server.service.spec.js.map