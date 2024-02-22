import { TestBed } from '@angular/core/testing';

import { InterceptorHttpInterceptor } from './interceptor-http.interceptor';

describe('InterceptorHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorHttpInterceptor = TestBed.inject(InterceptorHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
