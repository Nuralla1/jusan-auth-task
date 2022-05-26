export class Service {
  async registrateUser(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  async signInUser(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: new URLSearchParams(obj),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return res.statusText;
    }
    const resJson = await res.json();
    sessionStorage.setItem("Token", resJson.access_token);
  }

  async createItem(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    });
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  async getItems(skip, limit) {
    const res = await fetch(
      `http://10.130.19.30/api/items/?skip=${skip}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      }
    );
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  getUserData() {
    const res = fetch("http://10.130.19.30/api/users/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    });
    return res;
  }

  updateUserData(obj) {
    const res = fetch("http://10.130.19.30/api/users/me", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
      body: JSON.stringify(obj),
    });
    return res;
  }
}
