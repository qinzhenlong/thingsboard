///
/// Copyright © 2016-2022 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defaultHttpOptionsFromConfig, RequestConfig } from '@core/http/http-utils';
import { Observable } from 'rxjs';
import { QueueInfo, ServiceType } from '@shared/models/queue.models';
import { PageLink } from '@shared/models/page/page-link';
import { PageData } from '@shared/models/page/page-data';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(
    private http: HttpClient
  ) { }

  public getTenantQueuesNamesByServiceType(serviceType: ServiceType, config?: RequestConfig): Observable<Array<string>> {
    return this.http.get<Array<string>>(`/api/tenant/queues?serviceType=${serviceType}`,
      defaultHttpOptionsFromConfig(config));
  }

  public getQueueById(queueId: string): Observable<QueueInfo> {
    return this.http.get<QueueInfo>(`/api/tenant/queues/${queueId}`);
  }

  public getTenantQueuesByServiceType(pageLink: PageLink,
                                      serviceType: ServiceType,
                                      config?: RequestConfig): Observable<PageData<QueueInfo>> {
    return this.http.get<PageData<QueueInfo>>(`/api/tenant/queues${pageLink.toQuery()}&serviceType=${serviceType}`,
      defaultHttpOptionsFromConfig(config));
  }

  public saveQueue(queue: QueueInfo, serviceType: ServiceType, config?: RequestConfig): Observable<QueueInfo> {
    return this.http.post<QueueInfo>(`/api/tenant/queues?serviceType=${serviceType}`, queue, defaultHttpOptionsFromConfig(config));
  }

  public deleteQueue(queueId: string) {
    return this.http.delete(`/api/tenant/queues/${queueId}`);
  }
}
