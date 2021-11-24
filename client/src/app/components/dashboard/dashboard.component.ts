import { Component, OnInit } from "@angular/core";
import { UsersComponent } from "../functions/users/users.component";
import { HostListener } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  sidebarToggle: boolean = true;
  readerPanel: boolean = false;
  homePanel: boolean = true;
  active: boolean = false;

  items = [
    {
      name: "Home",
      icon: "fas fa-exchange-alt",
      children: [
        {
          name: "Manage Borrow",
          icon: "fas fa-plus-circle",
          active: false,
          value: "manageBorrow",
        },
        {
          name: "List of Borrows",
          icon: "fas fa-list",
          active: false,
          value: "listBorrow",
        },
      ],
    },
    {
      name: "Readers",
      icon: "fas fa-book-reader",
      children: [
        {
          name: "Manage Readers",
          icon: "fas fa-list",
          active: false,
          value: "manageReader",
        },
        {
          name: "Reported Readers",
          icon: "fas fa-list",
          active: false,
          value: "reportedReader",
        },
      ],
    },
    {
      name: "Books",
      icon: "fas fa-book",
      children: [
        {
          name: "Manage Books",
          icon: "fas fa-list",
          active: false,
          value: "manageBook",
        },
        {
          name: "List of Borrowed Books",
          icon: "fas fa-list",
          active: false,
          value: "listBorrowedBook",
        },
      ],
    },
    {
      name: "Settings",
      icon: "fas fa-cog",
      children: [
        {
          name: "Edit Profile",
          icon: "fas fa-list",
          active: false,
          value: "editProfile",
        },
      ],
    },
  ];

  @HostListener("window:resize", ["$event"])
  onResize() {
    window.innerWidth > 768
      ? (this.sidebarToggle = true)
      : (this.sidebarToggle = false);
  }

  constructor() {}

  ngOnInit(): void {
    this.homePanel = true;
  }

  activateClass(item) {
    item.active = !item.active;
  }

  showPanel(value) {
    if(value === 'manageReader'){
      this.readerPanel = true;
      this.homePanel = false;
    }
    console.log("show panels", value);
  }

  showReaderPanel() {
    this.readerPanel = true;
    this.homePanel = false;
  }

  toggleSidebar() {
    if (this.sidebarToggle) {
      this.sidebarToggle = false;
    } else {
      this.sidebarToggle = true;
      console.log("toggled");
    }
  }
}
