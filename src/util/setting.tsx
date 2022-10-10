import axios from "axios";
import { history } from "../index";

export const configs = {
  setStore: (name: string, values: any) => {
    localStorage.setItem(name, values);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name: string, values: any) => {
    // Biến thành chuỗi
    values = JSON.stringify(values);
    // Lưu vào store
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string, values: any) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },

  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};

export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  setStore,
  getStore,
  setStoreJSON,
  getStoreJSON,
} = configs;

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJraGFpZG9AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVklFV19QUk9GSUxFIiwibmJmIjoxNjYzMTU4NzQ2LCJleHAiOjE2NjMxNjIzNDZ9.a7-C44-MiZHYrhzxAu0JPkbr11sTftDQfZM0JuoN3yY";

//Cấu hình interceptor {Cấu hình cho các request và response}
export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 60000,
});

//Cấu hình request

http.interceptors.request.use(
  (configs) => {
    // Cấu hình tất cả header add thêm thuộc tính Authorization
    configs.headers = {
      ...configs.headers,
      ["Authorization"]: `Bearer ${getStore(ACCESS_TOKEN)}`,
      ["TokenCyersoft"]: TOKEN_CYBERSOFT,
    };
    return configs;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/*
    StatusCode: Mã kết quả trả về do backend qui định
    200(Success): Kết quả trả về thành công
    201(Created): Tạo giá trị thành công trên server (thường dùng 200)
    400(Bad Request); Không tồn tại đường dẫn
    404(Not Found): Không tìm thấy dữ liệu
    401(UnAuthorize): Không có quyền truy cập vào API
    403(Forbiden): Token chưa đủ quyền truy cập
    500(Error in server): Lỗi xảy ra trên server (Nguyên do do FE hoặc BE tùy tình huống)
*/

// Cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err.response.status);
    if (err.response.status === 400 || err.response.status === 404) {
      history.push("/");
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      alert("Token Không hợp lệ! Vui lòng đăng nhập lại");
      history.push("/login");
      return Promise.reject(err);
    }
  }
);
