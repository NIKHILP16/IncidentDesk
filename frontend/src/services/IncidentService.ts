import type {
  CreateMixin,
  GetMixin,
  ListMixin,
  PaginatedResponse,
  SearchParams,
  UpdateMixin,
} from "../interface/BaseService.type";

import { IncidentEndpoints } from "./Resources";
import { BaseService } from "./BaseService";
import type { Comment, Incident } from "../interface/Incident.type";
import instance from "../axios";
import { buildApiParams } from "../utils/buildApiParams";

class IncidentService
  extends BaseService<Incident>
  implements
    ListMixin<Incident>,
    CreateMixin<Incident>,
    GetMixin<Incident>,
    UpdateMixin<Incident>
{
  constructor() {
    super(IncidentEndpoints);
  }



  async createComment(
    incidentId: string,
    commentData: { content: string; author: string } 
  ): Promise<Comment> {
    const response = await instance.post<Comment>(
      IncidentEndpoints.POST_COMMENT(incidentId), 
      commentData 
    );
    return response.data;
  }


   async getComments(
    id: string,
    params?: SearchParams<Comment>
  ): Promise<PaginatedResponse<Comment>> {
    const response = await instance.get<PaginatedResponse<Comment>>(
      IncidentEndpoints.GET_COMMENT(id),
      {
        params: buildApiParams<Comment>(params),
      }
    );

    return response.data;
  }
}


export default new IncidentService();