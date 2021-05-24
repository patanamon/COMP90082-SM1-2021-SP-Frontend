export function formatDrawerData(data) {
    let drawerData = [];
    for (let i = 0, len = data.length; i < len; i++) {
      drawerData.push({
        name: data[i]["name"],
        email: data[i]["email"],
      });
    }
    return drawerData;
  }