export async function registerUser(data) {
    const url = 'http://localhost:3001/users/register';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  
  export async function loginUser(data) {
    const url = 'http://localhost:3001/users/login';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  