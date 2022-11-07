export default function AppBar() {
	return (
		<>
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
				<div class="container-fluid">
					<a class="navbar-brand" href="/">
						<img
							src="https://acsantangelo1907.com/hinh-quyen-sach-va-cay-but/imager_7_19127_700.jpg"
							alt=""
							width="30"
							height="24"
							class="d-inline-block align-text-top"
						/>
						ONEUET
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a href="/convert" class="nav-link">
									CONVERT
								</a>
							</li>
							<li class="nav-item">
								<a href="/document" class="nav-link">
									DOCUMENT
								</a>
							</li>
							<li class="nav-item">
								<a href="/grade" class="nav-link">
									GRADE
								</a>
							</li>
						</ul>
						<form class="d-flex" method="GET" action="/search">
							<input
								class="form-control me-2"
								name="keyword"
								type="search"
								placeholder="Input"
								aria-label="Search"
							/>
							<button class="btn btn-outline-success fw-bolder" type="submit">
								Tìm
							</button>
						</form>
					</div>
				</div>
			</nav>
		</>
	);
}
