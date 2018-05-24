import { GET_ANMIE, GET_ANMIE_DETAIL } from '../constants'

export const getAnime = () => async(dispatch, getState) => {
  const res = await fetch('https://www.ikanfan.cn/tool/week.php')
	const json = await res.json()
	
	dispatch({ type: GET_ANMIE, data: json.ResponseData })
}

export const getAnimeDetail = (params) => async(dispatch, getState) => {
	const res = await fetch(`https://www.ikanfan.cn/tool/xcxDetail.php?id=${params.id}`)
	const json = await res.json();

	dispatch({ type: GET_ANMIE_DETAIL, data: json.data[0] })
}