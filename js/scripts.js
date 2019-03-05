//simple comments for git practice
var contactCounter = 0;

// Business Logic for AddressBook  -------------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Address ------------
function Address(email, street, state, zip) {
  this.email = email;
  this.street = street;
  this.state = state;
  this.zip = zip;
}

// Business Logic for Contacts -------------
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

// function Address(emailAddress, physicalAddress) {
//   this.emailAddress = emailAddress;
//   this.physicalAddress = physicalAddress;
// }

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

//Front-end Logic
var addressBook = new AddressBook();

function displayContactDetails(addressBooktoDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBooktoDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactID) {
  var contact = addressBook.findContact(contactID);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address.email + "<br>" + contact.address.street + "  " + contact.address.state + "  " + contact.address.zip);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function toggleAddressForm() {
  $("#email-form").toggleClass("hidden");
  $("#physical-address-form").toggleClass("hidden");
}

function attachAddressListeners() {
  $("form").on("click", ".toggle-address", function() {
    toggleAddressForm();
  });
};

//when document is ready
$(function() {
  attachContactListeners();
  attachAddressListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedStreetAddress = $("input#new-street-address").val();
    var inputtedStateAddress = $("input#new-state-address").val();
    var inputtedZipAddress = $("input#new-zip-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street-address").val("");
    $("input#new-state-address").val("");
    $("input#new-zip-address").val("");
    var newAddress = new Address(inputtedEmailAddress, inputtedStreetAddress, inputtedStateAddress, inputtedZipAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
   })
});
