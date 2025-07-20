const SidebarToggle = {
  mounted() {
    this.handleEvent("toggle-sidebar", () => this.toggleSidebar())
    
    // Check if mobile and set initial state
    this.handleMobileState()
    
    // Add click event listener to hamburger button only
    const toggleButton = document.getElementById("sidebar-toggle-btn")
    if (toggleButton) {
      this.toggleButtonHandler = () => this.toggleSidebar()
      toggleButton.addEventListener("click", this.toggleButtonHandler)
    }
    
    // Listen for window resize to handle mobile/desktop transitions
    this.resizeHandler = () => this.handleMobileState()
    window.addEventListener("resize", this.resizeHandler)
    
    // Close sidebar when clicking outside on mobile
    this.outsideClickHandler = (e) => this.handleOutsideClick(e)
    document.addEventListener("click", this.outsideClickHandler)
  },
  
  destroyed() {
    // Clean up event listeners
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler)
    }
    if (this.outsideClickHandler) {
      document.removeEventListener("click", this.outsideClickHandler)
    }
    if (this.toggleButtonHandler) {
      const toggleButton = document.getElementById("sidebar-toggle-btn")
      if (toggleButton) {
        toggleButton.removeEventListener("click", this.toggleButtonHandler)
      }
    }
  },
  
  isMobile() {
    return window.innerWidth <= 640 // Tailwind sm breakpoint
  },
  
  isTablet() {
    return window.innerWidth > 640 && window.innerWidth <= 1024
  },
  
  handleOutsideClick(e) {
    const sidebar = document.getElementById("sidebar")
    const isClickInsideSidebar = sidebar.contains(e.target)
    
    // Check if click is inside any dropdown
    const isClickInsideDropdown = e.target.closest('.dropdown') || e.target.closest('.dropdown-content')
    
    // On mobile, close sidebar if clicked outside and sidebar is open
    // But don't close if clicking on dropdowns
    if (this.isMobile() && !isClickInsideSidebar && !isClickInsideDropdown && sidebar.getAttribute("data-collapsed") === "false") {
      this.setSidebarState(true)
    }
  },
  
  positionDropdown(dropdown, dropdownContent) {
    if (!dropdown || !dropdownContent) return
    
    const rect = dropdown.getBoundingClientRect()
    const contentRect = dropdownContent.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Reset styles
    dropdownContent.style.top = ''
    dropdownContent.style.left = ''
    dropdownContent.style.right = ''
    dropdownContent.style.transform = ''
    
    if (this.isMobile()) {
      // Center on mobile
      dropdownContent.style.top = '50%'
      dropdownContent.style.left = '50%'
      dropdownContent.style.transform = 'translate(-50%, -50%)'
    } else {
      // Position to the right of sidebar on desktop
      const sidebarWidth = rect.right
      const availableRightSpace = viewportWidth - sidebarWidth
      const dropdownWidth = contentRect.width || 280
      
      if (availableRightSpace >= dropdownWidth + 20) {
        // Enough space on the right
        dropdownContent.style.left = sidebarWidth + 'px'
        dropdownContent.style.top = (rect.top - contentRect.height + rect.height) + 'px'
      } else {
        // Not enough space on right, position on left of sidebar
        dropdownContent.style.right = (viewportWidth - rect.left) + 'px'
        dropdownContent.style.top = (rect.top - contentRect.height + rect.height) + 'px'
      }
      
      // Ensure dropdown doesn't go above viewport
      const currentTop = parseInt(dropdownContent.style.top)
      if (currentTop < 10) {
        dropdownContent.style.top = '10px'
      }
    }
  },
  
  handleMobileState() {
    const isMobile = this.isMobile()
    
    if (isMobile) {
      // On mobile, always start collapsed
      this.setSidebarState(true)
    } else {
      // On desktop/tablet, use saved state from localStorage
      const savedState = localStorage.getItem("sidebar-collapsed") === "true"
      this.setSidebarState(savedState)
    }
  },
  
  toggleSidebar() {
    const sidebar = document.getElementById("sidebar")
    const currentState = sidebar.getAttribute("data-collapsed") === "true"
    const newState = !currentState
    
    this.setSidebarState(newState)
    
    // Only save state on non-mobile devices
    if (!this.isMobile()) {
      localStorage.setItem("sidebar-collapsed", newState.toString())
    }
  },
  
  setSidebarState(collapsed) {
    const sidebar = document.getElementById("sidebar")
    sidebar.setAttribute("data-collapsed", collapsed.toString())
  }
}

export default SidebarToggle;