import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 基本返回数据格式
export interface RestResponse<T> {
  data: T;
  error_code: number;
  error_msg: string;
}

// 基本 Ajax 格式
interface BaseAjax {
  get: <T>(url: string, config?: object) => Promise<RestResponse<T>>;
  delete: <T>(url: string, config?: object) => Promise<RestResponse<T>>;
  post: <T>(
    url: string,
    data?: object,
    config?: object
  ) => Promise<RestResponse<T>>;
  put: <T>(
    url: string,
    data?: object,
    config?: object
  ) => Promise<RestResponse<T>>;
  patch: <T>(
    url: string,
    data?: object,
    config?: object
  ) => Promise<RestResponse<T>>;
}

function request<T>(config: AxiosRequestConfig): Promise<RestResponse<T>> {
  return new Promise((resolve, reject) => {
    Axios.request<RestResponse<T>>(config)
      .then(response => {
        const _data = response.data;
        if (_data.error_code === 0) {
          resolve(_data);
        } else {
          console.log(_data.error_msg);
          reject(_data);
        }
      })
      .catch(response => {
        const method = response.config.method;
        const url = response.config.url;
        console.error(`[LogView][HTTP Request error]: request: ${url}, method: ${method}, detail: ${response.message}`);
        reject(response);
    
      });
  });
}

const Ajax: BaseAjax = {
  get: function<T>(url: string, config: object = {}): Promise<RestResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: "GET",
        url: url
      })
    );
  },
  delete: function<T>(
    url: string,
    config: object = {}
  ): Promise<RestResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: "DELETE",
        url: url
      })
    );
  },
  post: function<T>(
    url: string,
    data: object = {},
    config: object = {}
  ): Promise<RestResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: "POST",
        url: url,
        data: data
      })
    );
  },
  put: function<T>(
    url: string,
    data: object = {},
    config: object = {}
  ): Promise<RestResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: "PUT",
        url: url,
        data: data
      })
    );
  },
  patch: function<T>(
    url: string,
    data: object = {},
    config: object = {}
  ): Promise<RestResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: "PATCH",
        url: url,
        data: data
      })
    );
  }
};

export default Ajax;
