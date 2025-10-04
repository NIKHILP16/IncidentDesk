
export class Resources {
  // base
  public static readonly BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";


  //incidents
  public static readonly INCIDENTS = "/incidents/";


}


export const IncidentEndpoints = {
  BASE: Resources.INCIDENTS,
  GET_BY_ID: (id: string) => `${Resources.INCIDENTS}${id}`,
  UPDATE: (id: string) => `${Resources.INCIDENTS}${id}/`,
  DELETE: (id: string) => `${Resources.INCIDENTS}${id}/`,
  GET_COMMENT: (id: string) => `${Resources.INCIDENTS}${id}/comments/`,
  POST_COMMENT: (id: string) => `${Resources.INCIDENTS}${id}/comments/`,
};
