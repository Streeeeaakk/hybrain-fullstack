import {apiSlice} from "./apiSlice"
const CATEGORY_URL = "/api/category"

export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		categories: builder.query({
			query: (data) => ({
				url: CATEGORY_URL,
				method: "GET",
				body: data,
			}),
		}),
		updateCategory: builder.mutation({
			query: (data) => ({
				url: CATEGORY_URL + "/updateCategory",
				method: "PUT",
				body: data,
			}),
		}),
		addCategory: builder.mutation({
			query: (data) => ({
				url: CATEGORY_URL + "/addCategory",
				method: "POST",
				body: data,
			}),
		}),
		deleteCategory: builder.mutation({
			query: ({id}) => ({
				url: CATEGORY_URL + "/deleteCategory",
				method: "DELETE",
				body: {id},
			}),
		}),
	}),
})

export const {
	useCategoriesQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} = categoryApiSlice

// validateStatus: (response, result) => {
// 	return response.status === 200 && !result.isError
// },
// transformResponse: (response, meta, arg) => response.data,
// transformErrorResponse: (response, meta, arg) => response.status,
