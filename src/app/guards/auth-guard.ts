import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common-service';

export const authGuard: CanActivateFn = (route, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);
  const sessionId = route.paramMap.get('sessionId');
  if (commonService?.authToken && commonService.sessionId === sessionId) {
    return true;
  }
  return router.createUrlTree(['/authentication'], {
    queryParams: { returnUrl: state.url }
  });
};
