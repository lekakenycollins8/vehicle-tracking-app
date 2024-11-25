export interface Vehicle {
    id: string;
    name: string;
    traccarDeviceId: string;
    lastPosition: {
      deviceTime: string;
      latitude: number;
      longitude: number;
      speed: number;
      attributes: any;
    } | null;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Position {
    id: string;
    vehicleId: string;
    latitude: number;
    longitude: number;
    speed: number;
    timestamp: string;
    attributes: any;
  }