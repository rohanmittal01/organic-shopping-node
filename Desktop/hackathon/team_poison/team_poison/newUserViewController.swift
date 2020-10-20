//
//  newUserViewController.swift
//  team_poison
//
//  Created by Vandana Mittal on 12/14/19.
//  Copyright © 2019 Rohan Mittal. All rights reserved.
//

import UIKit
import FirebaseAuth
import Firebase

class newUserViewController: UIViewController,UIPickerViewDelegate , UIPickerViewDataSource{

    private let data = ["Military","Home Security"]
    @IBOutlet weak var type: UITextField!
   
    
   
    
    var dataSelected : String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
       
        createPickerView()
        dismissPickerView()
        // Do any additional setup after loading the view.
    }
    
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
        
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return data.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return data[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
         dataSelected = data[row]
        type.text = dataSelected
    }
    
    func createPickerView()
    {
        let picker = UIPickerView()
        picker.delegate = self
        type.inputView = picker
    }

    func dismissPickerView()
    {
        let toolBar = UIToolbar()
        toolBar.sizeToFit()
        let doneButton = UIBarButtonItem(title: "Done", style: .plain, target: self, action: #selector(self.dismissKeyboard))
        toolBar.setItems([doneButton], animated: false)
        toolBar.isUserInteractionEnabled = true
        type.inputAccessoryView = toolBar
    }
    
    
    
    @objc func dismissKeyboard()
    {
        view.endEditing(true)
    }
    
    @IBOutlet weak var signup_email: UITextField!
    
    @IBOutlet weak var signup_pass: UITextField!
    
    
    
    
    @IBAction func signup(_ sender: Any) {
        let signup_Email=signup_email.text
              let signup_Pass=signup_pass.text
              
              
              Auth.auth().createUser(withEmail: signup_Email!, password: signup_Pass!, completion: { (user,error) in
                  
                  if let firebaseError=error{
                      print(firebaseError.localizedDescription)
                      let alert=UIAlertController(title: "Authentication Failed", message: "Please try again", preferredStyle: .alert)
                      alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
                      self.present(alert,animated: true, completion: nil)
                      return
                  
                  }
                  let homeview = self.storyboard?.instantiateViewController(withIdentifier:"abcde") as! UIViewController
                  self.present(homeview, animated: true, completion: nil)
                  print("successfully created")
                  })
              
    }
    
    
    
    
    
    
    /*
     
     
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

