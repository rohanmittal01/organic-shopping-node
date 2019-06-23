//
//  registerPageViewController.swift
//  NEWS
//
//  Created by Vandana Mittal on 6/21/19.
//  Copyright © 2019 Rohan Mittal. All rights reserved.
//

import UIKit

class registerPageViewController: UIViewController {

    @IBOutlet weak var emailview: UIView!
    @IBOutlet weak var passwordview: UIView!
    
    @IBOutlet weak var registerButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        
        // Do any additional setup after loading the view.
        
        emailViewSettings()
        passwordViewSettings()
       registerButtonSettings()
        
        
    }
    
    
    func emailViewSettings()
    {
         emailview.backgroundColor = UIColor.black.withAlphaComponent(0.2)
        
        emailview.layer.cornerRadius = emailview.frame.height/3
        emailview.layer.shadowColor = UIColor.darkGray.cgColor
    }
    
    func passwordViewSettings()
    {
      passwordview.backgroundColor = UIColor.black.withAlphaComponent(0.1)
        
        passwordview.layer.cornerRadius = passwordview.frame.height/5
        passwordview.layer.shadowColor = UIColor.darkGray.cgColor
    }

    func registerButtonSettings()
    {
            registerButton.layer.cornerRadius = registerButton.frame.height/5
        registerButton.layer.shadowColor = UIColor.darkGray.cgColor
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
