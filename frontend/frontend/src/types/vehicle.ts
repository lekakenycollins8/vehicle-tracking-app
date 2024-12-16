export interface Vehicle {
    id: string;
    userId: string;
    name: string;
    uniqueId: string;
    lastUpdate: string;
    status: 'active' | 'inactive';
    disabled: boolean;
    phone?: string;
    model?: string;
    contact?: string;
    category?: string;
    attributes?: any;
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
    attributes?: any;
  }