import {axiosPipeline} from "../../utils/axiosMiddlaware";
import {useStore} from "vuex";
import {useI18n} from 'vue-i18n'


export function useFetch() {
    const store = useStore()
    const {t} = useI18n()


    const getFormatResponse = (req, options) => {
        return req
            .then(resp => {
                if (options?.handleSuccess) {
                    store.dispatch('addNotification', {
                        type: 'success',
                        message: options.successMessage || t('common.notification.success')
                    })
                }

                return {
                    status: resp.status,
                    ok: !(resp.status >= 400 && resp.status < 200),
                    data: resp.data
                }
            })
            .catch(err => {
                    if (options?.handleError) {
                        if (err.response) {
                            store.dispatch('addNotification', {
                                type: 'error',
                                message: err.response.data.message
                            })
                        }
                    }
                    throw err
                }
            )
    }

    /**
     * Performs http GET request using axios with corresponded middleware
     * @param {String} url
     * @param {AxiosRequestConfig?} axiosConfig
     * @param {fetchOptions?} options
     * @returns {Promise<fetchResponse> || Promise<Error>}
     */
    const getData = (url, axiosConfig, options) => {
        return getFormatResponse(
            axiosPipeline.get(url, {needAuth: options?.needAuth, ...axiosConfig}),
            options
        )
    }

    /**
     * Wrapper over getData to perform http GET request using auth middleware
     * @param {String} url
     * @param {AxiosRequestConfig?} axiosConfig
     * @param {fetchOptions?} options
     * @returns {Promise<fetchResponse> || Promise<Error>}
     */
    const getDataAuthed = (url, axiosConfig, options) => {
        return getData(url, axiosConfig, {needAuth: true, ...options})
    }

    /**
     * Performs http POST request using axios with corresponded middleware
     * @param {String} url
     * @param {Object?} data
     * @param {AxiosRequestConfig?} axiosConfig
     * @param {fetchOptions?} options
     * @returns {Promise<fetchResponse> || Promise<Error>}
     */
    const postData = (url, data, axiosConfig, options) => {
        return getFormatResponse(
            axiosPipeline.post(url, data, {needAuth: options?.needAuth, ...axiosConfig}),
            options
        )
    }

    /**
     * Wrapper over postData to perform http POST request using auth middleware
     * @param {String} url
     * @param {Object?} data
     * @param {AxiosRequestConfig?} axiosConfig
     * @param {fetchOptions?} options
     * @returns {Promise<fetchResponse> || Promise<Error>}
     */
    const postDataAuthed = (url, data, axiosConfig, options) => {
        return postData(url, data, axiosConfig, {needAuth: true, ...options})
    }

    return {
        getData,
        getDataAuthed,
        postData,
        postDataAuthed
    }
}

/**
 * Options for http request wrapper
 * @alias fetchOptions
 * @type {
 *      {
 *        handleError: Boolean?,
 *        handleSuccess: Boolean?,
 *        successMessage: String?,
 *        needAuth: Boolean?
 *      }
 * }
 */

/**
 * Options for http request wrapper
 * @alias fetchResponse
 * @type {
 *      {
 *        ok: Boolean,
 *        data: Object,
 *        code: Number,
 *        status: Number
 *      }
 * }
 */
