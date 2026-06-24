const slides = [
    {
        title: "PATROBAS",
        subtitle: "Reborn Low Reflective",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        title: "NIKE",
        subtitle: "Air Max Collection",
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f"
    },
    {
        title: "ADIDAS",
        subtitle: "Street Edition",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    }
];

let current = 0;

document.addEventListener("DOMContentLoaded", () => {
    
    // ==================== PROTEKSI LINK SOSMED EXTERNAL ====================
    // Memastikan link sosmed di footer tidak diganggu oleh event JS lainnya
    const footerLinks = document.querySelectorAll(".footer-socials a");
    footerLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop JS mengintervensi link ini
        });
    });

    // ==================== LOGIKA HERO CAROUSEL ====================
    const hero = document.querySelector(".hero");
    const title = document.querySelector("h1");
    const subtitle = document.querySelector("p");

    function updateSlide() {
        if (!hero || !title || !subtitle) return;
        
        title.classList.remove("fade-animation");
        subtitle.classList.remove("fade-animation");
        void title.offsetWidth; // Trigger reflow
        void subtitle.offsetWidth;

        title.textContent = slides[current].title;
        subtitle.textContent = slides[current].subtitle;
        
        title.classList.add("fade-animation");
        subtitle.classList.add("fade-animation");

        const tempImage = new Image();
        const newImageUrl = slides[current].image;

        tempImage.onload = function() {
            hero.style.transition = 'background 0s'; 
            hero.style.opacity = '0.9'; 

            setTimeout(() => {
                hero.style.transition = 'background 0.8s ease-in-out, opacity 0.5s'; 
                hero.style.background = `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), url(${newImageUrl}) center/cover`;
                hero.style.opacity = '1'; 
            }, 50); 
        };
        tempImage.src = newImageUrl;
    }

    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (leftBtn && rightBtn) {
        leftBtn.onclick = () => {
            current = current === 0 ? slides.length - 1 : current - 1;
            updateSlide();
        };
        rightBtn.onclick = () => {
            current = current === slides.length - 1 ? 0 : current + 1;
            updateSlide();
        };
    }

    // ==================== LOGIKA PRODUCT SLIDER HORIZONTAL ====================
    const productSlider = document.querySelector(".products-slider");
    const card = document.querySelector(".product-card");
    const prodLeftBtn = document.querySelector(".prod-left-btn");
    const prodRightBtn = document.querySelector(".prod-right-btn");

    if (productSlider && card) {
        const gap = 20;
        const scrollAmount = (card.offsetWidth + gap) * 2;

        if (prodLeftBtn) {
            prodLeftBtn.onclick = () => {
                productSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            };
        }
        if (prodRightBtn) {
            prodRightBtn.onclick = () => {
                productSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            };
        }
    }

    // ==================== LOGIKA OPEN & CLOSE SIDEBAR MENU UTAMA ====================
    const sidebar = document.getElementById("sidebarMenu");
    const overlay = document.getElementById("sidebarOverlay");
    const openMenuBtn = document.getElementById("openMenuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");

    if (openMenuBtn) {
        openMenuBtn.onclick = () => {
            if (sidebar) sidebar.classList.add("active");
            if (overlay) overlay.classList.add("active");
        };
    }

    if (closeMenuBtn) {
        closeMenuBtn.onclick = () => {
            if (sidebar) sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
        };
    }

    const sidebarLinks = document.querySelectorAll(".sidebar-links a");
    sidebarLinks.forEach(link => {
        link.onclick = () => {
            if (sidebar) sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
        };
    });

    // ==================== LOGIKA PANEL SIDEBAR SHOPPING CART ====================
    const cartPanel = document.getElementById("cartPanel");
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartPanelBtn = document.getElementById("closeCartPanelBtn");

    const openCart = () => {
        if (cartPanel && overlay) {
            cartPanel.classList.add("active");
            overlay.classList.add("active");
            if (sidebar) sidebar.classList.remove("active");
            if (wishlistPanel) wishlistPanel.classList.remove("active");
        }
    };

    const closeCart = () => {
        if (cartPanel) {
            cartPanel.classList.remove("active");
            const isSidebarActive = sidebar?.classList.contains("active");
            const isWishlistActive = wishlistPanel?.classList.contains("active");
            if (!isSidebarActive && !isWishlistActive && overlay) overlay.classList.remove("active");
        }
    };

    if (openCartBtn) openCartBtn.onclick = openCart;
    if (closeCartPanelBtn) closeCartPanelBtn.onclick = closeCart;

    // ==================== LOGIKA PANEL SIDEBAR WISHLIST & SISTEM SIMPAN DATA ====================
    const wishlistPanel = document.getElementById("wishlistPanel");
    const openWishlistBtn = document.getElementById("openWishlistBtn");
    const closeWishlistBtn = document.getElementById("closeWishlistBtn");
    
    let wishlistItems = JSON.parse(localStorage.getItem("wishlistData")) || [];

    const openWishlist = () => {
        if (wishlistPanel && overlay) {
            wishlistPanel.classList.add("active");
            overlay.classList.add("active");
            if (sidebar) sidebar.classList.remove("active");
            if (cartPanel) cartPanel.classList.remove("active");
        }
    };

    const closeWishlist = () => {
        if (wishlistPanel) {
            wishlistPanel.classList.remove("active");
            const isSidebarActive = sidebar?.classList.contains("active");
            const isCartActive = cartPanel?.classList.contains("active");
            if (!isSidebarActive && !isCartActive && overlay) overlay.classList.remove("active");
        }
    };

    if (openWishlistBtn) openWishlistBtn.onclick = openWishlist;
    if (closeWishlistBtn) closeWishlistBtn.onclick = closeWishlist;

    function renderWishlist() {
        if (!wishlistPanel) return;

        let itemsContainer = wishlistPanel.querySelector(".wishlist-items-container");
        const emptyState = wishlistPanel.querySelector(".wishlist-content-empty");
        const clearAllBtn = wishlistPanel.querySelector(".clear-all-btn");

        if (!itemsContainer) {
            itemsContainer = document.createElement("div");
            itemsContainer.className = "wishlist-items-container";
            wishlistPanel.insertBefore(itemsContainer, emptyState);
        }

        itemsContainer.innerHTML = "";

        if (wishlistItems.length === 0) {
            if (emptyState) emptyState.style.display = "flex";
            if (clearAllBtn) clearAllBtn.style.display = "none";
        } else {
            if (emptyState) emptyState.style.display = "none";
            if (clearAllBtn) clearAllBtn.style.display = "inline-block";

            wishlistItems.forEach(item => {
                const itemHTML = `
                    <div class="wishlist-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="wishlist-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.price}</p>
                        </div>
                        <button class="wishlist-item-remove"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `;
                itemsContainer.innerHTML += itemHTML;
            });

            itemsContainer.querySelectorAll(".wishlist-item-remove").forEach(btn => {
                btn.onclick = (e) => {
                    const itemId = e.target.closest(".wishlist-item").dataset.id;
                    toggleWishlistProduct(itemId);
                };
            });
        }

        document.querySelectorAll(".product-card").forEach(card => {
            const titleEl = card.querySelector("h3");
            if (!titleEl) return;
            const id = titleEl.textContent.trim();
            const loveBtn = card.querySelector(".wishlist-btn");
            const icon = loveBtn?.querySelector("i");

            if (wishlistItems.some(item => item.id === id)) {
                loveBtn?.classList.add("liked");
                if (icon) icon.className = "fa-solid fa-heart";
            } else {
                loveBtn?.classList.remove("liked");
                if (icon) icon.className = "fa-regular fa-heart";
            }
        });
    }

    function toggleWishlistProduct(id, cardElement = null) {
        const index = wishlistItems.findIndex(item => item.id === id);

        if (index > -1) {
            wishlistItems.splice(index, 1);
        } else if (cardElement) {
            const name = cardElement.querySelector("h3").textContent.trim();
            const price = cardElement.querySelector(".price").textContent.trim();
            const image = cardElement.querySelector(".img-wrapper img")?.src || cardElement.querySelector("img")?.src;

            wishlistItems.push({ id, name, price, image });
        }

        localStorage.setItem("wishlistData", JSON.stringify(wishlistItems));
        renderWishlist();
    }

    document.body.addEventListener("click", (e) => {
        const loveBtn = e.target.closest(".wishlist-btn");
        if (loveBtn) {
            const cardElement = loveBtn.closest(".product-card");
            const titleEl = cardElement.querySelector("h3");
            if (titleEl) {
                const id = titleEl.textContent.trim();
                toggleWishlistProduct(id, cardElement);
            }
        }
    });

    if (wishlistPanel) {
        const clearAllWishBtn = wishlistPanel.querySelector(".clear-all-btn");
        if (clearAllWishBtn) {
            clearAllWishBtn.onclick = () => {
                wishlistItems = [];
                localStorage.setItem("wishlistData", JSON.stringify(wishlistItems));
                renderWishlist();
            };
        }
    }

    renderWishlist();

    // ==================== RE-LOGIKA GLOBAL OVERLAY CLICK ====================
    if (overlay) {
        overlay.onclick = () => {
            if (sidebar) sidebar.classList.remove("active");
            if (wishlistPanel) wishlistPanel.classList.remove("active");
            if (cartPanel) cartPanel.classList.remove("active");
            overlay.classList.remove("active");
        };
    }

    // ==================== SISTEM ADAPTIF OPTIONS MODAL & KERANJANG BELANJA ====================
    let cartItems = JSON.parse(localStorage.getItem("cartData")) || [];

    const optionsModal = document.getElementById('optionsModal');
    const closeOptionsModal = document.getElementById('closeOptionsModal');
    const modalProductImg = document.getElementById('modalProductImg');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalSubmitBag = document.getElementById('modalSubmitBag');

    let cartItemsContainer = cartPanel?.querySelector(".cart-items-container");
    const cartContentEmpty = cartPanel?.querySelector(".cart-content-empty");
    const cartFooter = cartPanel?.querySelector(".cart-footer");

    if (cartPanel && !cartItemsContainer && cartFooter) {
        cartItemsContainer = document.createElement('div');
        cartItemsContainer.className = 'cart-items-container';
        cartItemsContainer.style.cssText = "flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; margin-top: 20px; padding-right: 5px;";
        cartPanel.insertBefore(cartItemsContainer, cartFooter);
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-bag-btn')) {
            const card = e.target.closest('.product-card');
            if (!card) return;
            
            const imgSrc = card.querySelector('.img-wrapper img')?.src || card.querySelector('img')?.src;
            const name = card.querySelector('.product-info h3').innerText;
            const price = card.querySelector('.product-info .price').innerText;

            modalProductImg.src = imgSrc;
            modalProductName.innerText = name;
            modalProductPrice.innerText = price;

            document.querySelectorAll('.size-btn, .variant-btn').forEach(btn => btn.classList.remove('selected'));

            if (optionsModal) optionsModal.classList.add('active');
        }
    });

    if (closeOptionsModal) {
        closeOptionsModal.addEventListener('click', () => {
            optionsModal.classList.remove('active');
        });
    }

    if (optionsModal) {
        optionsModal.addEventListener('click', (e) => {
            if (e.target === optionsModal) optionsModal.classList.remove('active');
        });
    }

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    function renderCart() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = "";
        
        const bagTextElements = document.querySelectorAll('.cart-text');
        bagTextElements.forEach(el => {
            el.innerText = `BAG (${cartItems.length})`;
        });

        if (cartItems.length === 0) {
            if (cartContentEmpty) cartContentEmpty.style.display = "flex";
            const totalEl = document.querySelector('.total-price');
            if (totalEl) totalEl.innerText = "Rp 0";
            return;
        } else {
            if (cartContentEmpty) cartContentEmpty.style.display = "none";
        }

        let totalPriceSum = 0;

        cartItems.forEach(item => {
            const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
            totalPriceSum += numericPrice * item.quantity;

            const cartItemHTML = `
                <div class="cart-item" style="display: flex; gap: 15px; background: #111; padding: 15px; border-radius: 16px; border: 1px solid #1a1a1a; align-items: center; color: white;">
                    <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: contain; background: #fff; border-radius: 12px; padding: 5px;">
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                        <h4 style="font-size: 14px; font-weight: bold; margin: 0; color: #fff;">${item.name}</h4>
                        <p style="font-size: 11px; color: #777; margin: 0;">Size: ${item.size} | Variant: ${item.variant}</p>
                        <span style="font-size: 13px; color: #00cfff; font-weight: bold;">${item.price}</span>
                    </div>
                    <button class="remove-cart-item-btn" data-id="${item.id}" style="background: transparent; border: none; color: #555; cursor: pointer; font-size: 18px; transition: color 0.2s;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.innerText = "Rp " + totalPriceSum.toLocaleString('id-ID');
        }
    }

    if (modalSubmitBag) {
        modalSubmitBag.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-btn.selected');
            const selectedVariant = document.querySelector('.variant-btn.selected');

            if (!selectedSize || !selectedVariant) {
                alert('Please select both Size and Variant first!');
                return;
            }

            const newItem = {
                id: Date.now().toString(),
                name: modalProductName.innerText,
                price: modalProductPrice.innerText,
                image: modalProductImg.src,
                size: selectedSize.innerText,
                variant: selectedVariant.innerText,
                quantity: 1
            };

            cartItems.push(newItem);
            localStorage.setItem("cartData", JSON.stringify(cartItems));
            
            renderCart();

            if (optionsModal) optionsModal.classList.remove('active');
            openCart();
        });
    }

    // FIX TERHADAP STRUKTUR KURUNG TUTUP YANG SALAH LETAK
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-cart-item-btn');
            if (removeBtn) {
                const itemId = removeBtn.getAttribute('data-id');
                cartItems = cartItems.filter(item => item.id !== itemId);
                localStorage.setItem("cartData", JSON.stringify(cartItems));
                renderCart();
            }
        });
    }

    // ==================== EVENT LISTENER TOMBOL ADMIN REPORT ====================
    const adminReportBtn = document.getElementById("adminReportBtn");
    if (adminReportBtn) {
        adminReportBtn.onclick = (e) => {
            e.preventDefault(); 
            downloadSalesReportCSV();
            if (sidebar) sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
        };
    }

    const clearAllCartBtn = document.querySelector('.clear-all-cart-btn');
    if (clearAllCartBtn) {
        clearAllCartBtn.onclick = () => {
            cartItems = [];
            localStorage.setItem("cartData", JSON.stringify(cartItems));
            renderCart();
        };
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (cartItems.length === 0) {
                alert('Keranjang belanja kamu masih kosong, nih! Silakan pilih sepatu dulu.');
                return;
            }
            window.location.href = "checkout.html";
        };
    }

    renderCart();

    // ==================== LOGIKA DETEKSI KHUSUS HALAMAN CHECKOUT.HTML ====================
    const summaryProductsList = document.getElementById("summaryProductsList");
    
    if (summaryProductsList) {
        const totalItemsText = document.getElementById("totalItemsText");
        const summaryTotalPriceText = document.getElementById("summaryTotalPriceText");
        const placeOrderBtn = document.getElementById("placeOrderBtn");
        const successOverlay = document.getElementById("successOverlay");

        let checkoutTotal = 0;
        let checkoutQuantity = 0;

        if (cartItems.length === 0) {
            summaryProductsList.innerHTML = `<p style="color: #77828d; font-size: 13px; text-align: center; padding: 10px 0;">Keranjang belanja kosong.</p>`;
        } else {
            summaryProductsList.innerHTML = "";
            cartItems.forEach(item => {
                const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                checkoutTotal += numericPrice * item.quantity;
                checkoutQuantity += item.quantity;

                const rowHTML = `
                    <div class="summary-item-row">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>${item.variant} • Qty: ${item.quantity}</p>
                        </div>
                        <div class="item-price">${item.price}</div>
                    </div>
                `;
                summaryProductsList.insertAdjacentHTML('beforeend', rowHTML);
            });
        }

        if (totalItemsText) totalItemsText.innerText = `${checkoutQuantity} Items`;
        if (summaryTotalPriceText) summaryTotalPriceText.innerText = "Rp " + checkoutTotal.toLocaleString('id-ID');

        if (placeOrderBtn) {
            placeOrderBtn.onclick = () => {
                const fullName = document.getElementById("fullName").value.trim();
                const email = document.getElementById("email").value.trim();
                const phoneNumber = document.getElementById("phoneNumber").value.trim();
                const fullAddress = document.getElementById("fullAddress").value.trim();
                const paymentMethod = document.getElementById("paymentMethod").value;

                if (!fullName || !email || !phoneNumber || !fullAddress || !paymentMethod) {
                    alert("Harap lengkapi seluruh kolom informasi pengiriman dan metode pembayaran terlebih dahulu!");
                    return;
                }

                let currentSales = JSON.parse(localStorage.getItem("salesData")) || [];

                cartItems.forEach(item => {
                    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                    
                    const transactionRecord = {
                        tanggal: new Date().toLocaleString('id-ID'),
                        namaPembeli: fullName,
                        noHp: phoneNumber,
                        alamat: fullAddress.replace(/\n/g, " "),
                        namaProduk: item.name,
                        varian: item.variant,
                        ukuran: item.size,
                        hargaSatuan: numericPrice,
                        jumlah: item.quantity,
                        totalHarga: numericPrice * item.quantity,
                        metodeBayar: paymentMethod
                    };
                    
                    currentSales.push(transactionRecord);
                });

                localStorage.setItem("salesData", JSON.stringify(currentSales));

                if (successOverlay) {
                    successOverlay.classList.add("show");
                }

                localStorage.removeItem("cartData");

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 3500);
            };
        }
    }
});

// ==================== FUNGSI GLOBAL GENERATE & DOWNLOAD LAPORAN CSV ====================
function downloadSalesReportCSV() {
    const salesData = JSON.parse(localStorage.getItem("salesData")) || [];

    if (salesData.length === 0) {
        alert("Belum ada data penjualan yang terekam!");
        return;
    }

    const headers = [
        "Tanggal Transaksi",
        "Nama Pembeli",
        "No HP",
        "Alamat",
        "Nama Produk",
        "Varian",
        "Ukuran",
        "Harga Satuan",
        "Jumlah Beli",
        "Total Harga",
        "Metode Pembayaran"
    ];

    const csvRows = [];
    csvRows.push(headers.join(","));

    salesData.forEach(row => {
        const values = [
            `"${row.tanggal}"`,
            `"${row.namaPembeli}"`,
            `"${row.noHp}"`,
            `"${row.alamat}"`,
            `"${row.namaProduk}"`,
            `"${row.varian}"`,
            `"${row.ukuran}"`,
            row.hargaSatuan,
            row.jumlah,
            row.totalHarga,
            `"${row.metodeBayar}"`
        ];
        csvRows.push(values.join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\n"); 

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Penjualan_Kicksoul_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
