import {Injectable} from '@angular/core';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import {getCLS, getFID, getLCP} from 'web-vitals';

function isPromise(promise) {
  return !!promise && typeof promise.then === 'function';
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsTimingService {
  constructor(private ga: GoogleAnalyticsService) {
    this.logPerformanceMetrics();
  }

  logPerformanceMetrics() {
    const sendToGoogleAnalytics = ({name, delta, value, id}) => {
      this.ga.gtag('event', name, {
        value: delta,
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
      });
    };

    getCLS(sendToGoogleAnalytics);
    getFID(sendToGoogleAnalytics);
    getLCP(sendToGoogleAnalytics);
  }

  time<T>(timingCategory: string, timingVar: string, callable: () => T): T {
    const start = performance.now();
    const done = () => {
      const time = performance.now() - start;
      if (this.ga.gtag) {
        const intTime = Math.round(time);
        this.ga.gtag('event', `${timingCategory}:${timingVar}`, {
          value: intTime,
          metric_value: intTime,
        });
      }
    };

    let call = callable();
    if (isPromise(call)) {
      call = (call as any).then(res => {
        done();
        return res;
      }) as any;
    } else {
      done();
    }

    return call;
  }
}
