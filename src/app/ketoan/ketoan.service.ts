import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KetoanService {
  constructor() { }
// Create
create = async (data: any) => {
  try {
    return await (await fetch(`${environment.apiUrl}/ketoan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).json();
  } catch (error) {
    console.error('Error creating ketoan:', error);
    throw error;
  }
};

// Read
getAll = async () => {
  try {
    return await (await fetch(`${environment.apiUrl}/ketoan`)).json();
  } catch (error) {
    console.error('Error getting ketoan:', error);
    throw error;
  }
};

// Update
update = async (id: string, data: any) => {
  try {
    return await (await fetch(`${environment.apiUrl}/ketoan/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).json();
  } catch (error) {
    console.error('Error updating ketoan:', error);
    throw error;
  }
};

// Delete
remove = async (id: string) => {
  try {
    return await (await fetch(`${environment.apiUrl}/ketoan/${id}`, {
      method: 'DELETE',
    })).json();
  } catch (error) {
    console.error('Error deleting ketoan:', error);
    throw error;
  }
};

}


