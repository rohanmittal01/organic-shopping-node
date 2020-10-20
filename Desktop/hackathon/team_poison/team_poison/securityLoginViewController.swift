//
//  securityLoginViewController.swift
//  team_poison
//
//  Created by Vandana Mittal on 12/14/19.
//  Copyright © 2019 Rohan Mittal. All rights reserved.
//

import UIKit
import FirebaseAuth
import Firebase
extension UIViewController{
    func HideKeyboard1() {
        let Tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(DismissKeyboard1))
        view.addGestureRecognizer(Tap)
        
    }
    
    @objc func DismissKeyboard1()
    {
        view.endEditing(true)
    }
    
}
class securityLoginViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.HideKeyboard1()
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
         self.view.endEditing(true)
         
         return true
     }
    
    @IBOutlet weak var unitCode: UITextField!
    @IBOutlet weak var password: UITextField!
    
    
    @IBAction func loginButton(_ sender: Any) {
        Auth.auth().signIn(withEmail: unitCode.text!, password: password.text!) { (user, error) in
                        if error != nil {
                            print("Login was unsuccessfull")
                          let alert = UIAlertController(title: "LOGIN FAILED!", message: "Please check the Credentials", preferredStyle: UIAlertController.Style.alert)
                          alert.addAction(UIAlertAction(title:"OK",style: UIAlertAction.Style.default, handler:{(action) in alert.dismiss(animated: true, completion: nil)}))
                          self.present(alert, animated: true, completion: nil)
                        }
                        else{
                            print("Successfully Logged In")
                         //   SVProgressHUD.dismiss()
                            self.performSegue(withIdentifier: "goToChat", sender: self)
                        }
                    }
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
