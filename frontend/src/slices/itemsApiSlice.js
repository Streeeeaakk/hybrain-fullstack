import {apiSlice} from "./apiSlice"
const ITEM_URL = "/api/items"

export const itemsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		items: builder.query({
			query: (data) => ({
				url: ITEM_URL,
				method: "GET",
				body: data,
			}),
		}),
		addItem: builder.mutation({
			query: (data) => ({
				url: ITEM_URL + "/addItem",
				method: "POST",
				body: data,
			}),
		}),
		updateItem: builder.mutation({
			query: (data) => ({
				url: ITEM_URL + "/updateItem",
				method: "PUT",
				body: data,
			}),
		}),
		deleteItem: builder.mutation({
			query: ({id}) => ({
				url: ITEM_URL + "/deleteItem",
				method: "DELETE",
				body: {id},
			}),
		}),
	}),
})

export const {
	useItemsQuery,
	useAddItemMutation,
	useDeleteItemMutation,
	useUpdateItemMutation,
} = itemsApiSlice
