import { ref } from "vue";
import { GET_USERS } from "../queries/query";

export const useAuth = () => {
  const error = ref("");

  const login = async (username, password) => {
    const query = GET_USERS;
    console.log("username and password", username, password);
    const variables = { username, password };

    try {
      const { data, errors } = await useAsyncQuery(query, variables, {
        context: {
          headers: {
            'x-hasura-admin-secret': "V8KZYROA1fZYAcR7gyfw4i7BeG44cThz4sRGHAj6m2sJWi3tWN1SM71MVgly0Em8"
          },
        },
      });

      if (errors) {
        console.error("GraphQL Errors:", errors);
        error.value = errors.map(e => e.message).join(", ");
        return { success: false, message: error.value };
      }

      console.log("The data returned is", data);

      if (data?.value?.mySchema_users?.length > 0) {
        error.value = '';
        return { success: true };
      } else {
        error.value = "Invalid username or password";
        return { success: false, message: error.value };
      }
    } catch (err) {
      console.error("The error is", err);
      error.value = "An error occurred. Please try again.";
      return { success: false, message: error.value };
    }
  };

  return { login, error };
};
