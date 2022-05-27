export class Service {
  async registrateUser(
    url: string,
    obj: {
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      telephone: string;
      password: string;
    }
  ) {
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

  async signInUser(
    url: string,
    obj: {
      username: string;
      password: string;
    }
  ) {
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

  async createItem(
    url: string,
    obj: {
      title: string;
      description: string;
    }
  ) {
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

  async getItems(skip: number, limit: number) {
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
    if (res.status === 403) {
      sessionStorage.clear();
      location.replace("/");
    }
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

  updateUserData(obj: {
    email?: string;
    username: string;
    first_name: string;
    last_name: string;
    telephone: string;
    password: string;
  }) {
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
