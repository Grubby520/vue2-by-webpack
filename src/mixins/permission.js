let cachedPermissions = {};

function mockApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          "oemSettleAccounts-operations.export",
          "oemSettleAccounts-operations.confirm",
        ],
      });
    }, 300);
  });
}

const getPermissions = (groupName) => {
  return new Promise((resolve) => {
    const permission = cachedPermissions[groupName];
    if (!permission) {
      mockApi(groupName).then(({ data = [] }) => {
        cachedPermissions[groupName] = data;
        resolve(data);
      });
    } else {
      resolve(permission);
    }
  });
};

export default (group) => {
  return {
    data() {
      return {
        permissions: [],
      };
    },
    mounted() {
      getPermissions(group).then((data) => {
        this.permissions = data;
      });
    },
    methods: {
      checkPermission(type) {
        return this.permissions.includes(`${group}.${type}`);
      },
    },
  };
};
