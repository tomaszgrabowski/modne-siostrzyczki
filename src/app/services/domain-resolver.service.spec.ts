import { TestBed } from '@angular/core/testing';

import { DomainResolverService } from './domain-resolver.service';

describe('DomainResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainResolverService = TestBed.get(DomainResolverService);
    expect(service).toBeTruthy();
  });
});
