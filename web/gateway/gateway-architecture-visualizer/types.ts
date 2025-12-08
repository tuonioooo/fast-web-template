export interface PredicateRule {
  id: string;
  matched: boolean;
}

export interface RouteData {
  id: string;
  title?: string;
  description: string;
  predicates: PredicateRule[];
  targetService: string;
  isActive?: boolean;
}

export enum ConnectionStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  NEUTRAL = 'NEUTRAL',
}

export interface ClientData {
  id: string;
  label: string;
  connectedRoutes: {
    routeId: string;
    status: ConnectionStatus;
  }[];
}