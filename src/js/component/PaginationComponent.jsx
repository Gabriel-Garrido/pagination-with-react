import React, { useEffect, useState } from "react";

function PaginationComponent() {
	const [characters, setCharacters] = useState([])
	const [infoPage, setInfoPage] = useState({})
	const [itemPagination, setItemPagination] = useState([])

	const GetList = (page, url) => {
		let uri =
			page === null
				? url
				: `https://rickandmortyapi.com/api/character/?page=${page}`
		fetch(uri)
			.then((response) => response.json())
			.then((data) => {
				setCharacters(data.results)
				setInfoPage(data.info)
			})
	}

	useEffect(() => {
		GetList(0, null)
	}, [])

	useEffect(() => {
		let items =[]
		for(let i=1; i<infoPage.pages;i++) {
			items.push(<li class="page-item" key={i}><a class="page-link" onClick={(e) => {GetList(parseInt(e.target.text), null)}} href="#">{i}</a></li>)
		}
		setItemPagination(items)
	},[infoPage])

	return (
		<div className="container">

			<div class="card text-center">
					<div class="card-header fs-1">
						Pagination API rick and morty
					</div>
					<div class="card-body">
						
						<table className="table mt-4">
							<thead>
								<tr>
									<th scope="col">Imagen</th>
									<th scope="col">Nombre</th>
									<th scope="col">Especie</th>
									<th scope="col">Genero</th>
								</tr>
							</thead>
							<tbody>
								{characters?.map((item,i) => {
									return (
										<tr key={i}>
											<td><img src={item.image} className=" img rounded-4 border border-dark border-5 border-opacity-50" alt="foto"/></td>
											<td>{item.name}</td>
											<td>{item.species}</td>
											<td>{item.gender}</td>
										</tr>
									)
										
								})}
							</tbody>
						</table>

					</div>
					<div class="card-footer d-flex justify-content-center">
						
						<nav aria-label="Page navigation example">
							<ul class="pagination">
								<li class="page-item">
								<a class="page-link" href="#" aria-label="Previous"
								onClick={() => {
									if (infoPage.prev === null) {
										GetList(0, null)
									}else {
										GetList (null, infoPage.prev)
									}
								}}
								>
									<span aria-hidden="true">&laquo;</span>
								</a>
								</li>
								
								{itemPagination.map((item) => {
									return item
								})}

								<li class="page-item">
									<a class="page-link" href="#" aria-label="Next"
									onClick={() => {
										if (infoPage.next === null) {
											GetList(0, null)
										}else {
											GetList (null, infoPage.next)
										}
									}}
									>
										<span aria-hidden="true">&raquo;</span>
									</a>
								</li>
							</ul>
						</nav>

					</div>
				</div>
        </div>
	);
};

export default PaginationComponent;
