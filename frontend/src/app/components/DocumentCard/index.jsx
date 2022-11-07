export default function DocumentCard() {
	return (
		<>
			<div>
				<div class="card col-lg-3 bg-black">
					<div class="card bg-dark card-book-item">
						<a href="">
							<img
								class="card-img-top"
								src="https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg"
								alt=""
							/>
						</a>
					</div>
					<div class="card-body text-center">
						<button
							class="rounded btn btn-danger btn-sm"
							data-bs-toggle="modal"
							data-id=""
							data-bs-target="#delete-book"
						>
							Xóa
						</button>

						<a href="">
							<button class="rounded btn btn-warning btn-sm text-light">
								Chỉnh sửa
							</button>
						</a>
					</div>
				</div>

				<div class="card col-lg-3 bg-black">
					<div class="card bg-dark card-book-item">
						<a href="">
							<img
								class="card-img-top"
								src="https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg"
								alt=""
							/>
						</a>
					</div>
					<div class="card-body text-center">
						<button
							class="rounded btn btn-danger btn-sm"
							data-bs-toggle="modal"
							data-id=""
							data-bs-target="#delete-book"
						>
							Xóa
						</button>

						<a href="">
							<button class="rounded btn btn-warning btn-sm text-light">
								Chỉnh sửa
							</button>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
