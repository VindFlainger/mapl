import {axiosPipeline} from "../../utils/axiosMiddlaware";

export default {
    methods: {

        getData(url, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.get(url, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        getDataAuthed(url, options, axiosConfig) {
            return this.getData(url, options, true, axiosConfig)
        },

        postData(url, data, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.post(url, data, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        postDataAuthed(url, data, options, axiosConfig) {
            return this.postData(url, data, options, true, axiosConfig)
        },

        putData(url, data, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.put(url, data, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        putDataAuthed(url, data, options, axiosConfig) {
            return this.putData(url, data, options, true, axiosConfig)
        },

        delData(url, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.delete(url, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        delDataAuthed(url, options, axiosConfig) {
            return this.delData(url, options, true, axiosConfig)
        },

        getFormatResponse(req, options) {
            options = options || {}
            return req
                .then(resp => {
                    if (options.handleSuccess) {
                        console.log('dsa')
                    }

                    return {
                        status: resp.status,
                        ok: !(resp.status >= 400 && resp.status < 200),
                        data: resp.data
                    }
                })
                .catch(err => {
                        if (options.handleError) {
                            console.log('dsa')
                        }
                        throw err
                    }
                )
        },
    }
}