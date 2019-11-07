<?php
use sdk\frontend\User as SdkUser;
use common\models\User;


function beforeAction($action)
{
    // \channels\aap\components\l::og('before action thing view!!!');
    // \channels\aap\components\l::og($action);
    return true;
}



function beforePageView($data)
{
    // $userSdk = new SdkUser();
    // $uniqueId = Yii::$app->request->get('id');
    // $authToken = Yii::$app->request->get('token');

    //     $socialInfo = \Yii::$app->socialCache->getCache($uniqueId);


    // if($data['slug'] == 'login-membes') {
    //     $url = \yii\helpers\Url::toRoute(
    //         [
    //             '/admin/auth/auth', 
    //             'authclient' => 'membes',
    //             'cancelUrl' => \yii\helpers\Url::base(true),
    //             'redirectUrl' => \yii\helpers\Url::base(true) . '/join-membes',
    //         ]
    //     );
    //     Yii::$app->response->redirect($url);
    //     Yii::$app->end();
    // }

    // if($data['slug'] == 'join-membes') {
        
    //     $uniqueId = Yii::$app->request->get('id');
    //     $authToken = Yii::$app->request->get('token');

    //     $socialInfo = \Yii::$app->socialCache->getCache($uniqueId);
    //     $tokenSecret = md5($socialInfo['token'] . \Yii::$app->params['social-token-salt']);
        
    //     if (!isset($socialInfo) || $authToken !== $socialInfo['token'] || $socialInfo['tokenSecret'] !== $tokenSecret 
    //             || $uniqueId == '' || $authToken == '' || $socialInfo['response']['code'] == 500) {
            
    //         Yii::$app->response->redirect(\yii\helpers\Url::base(true));
    //         Yii::$app->end();
    //     }

    //     if (empty($socialInfo['response']['data']['DATA'])) {
    //         Yii::$app->response->redirect(\yii\helpers\Url::base(true));
    //         Yii::$app->end();
    //     }

    //     /*
    //     Array
    //         (
    //             [membershipstatusid] => 1
    //             [membershiptypeid] => 846
    //             [surname] => Jones
    //             [id] => 1
    //             [firstname] => Jason
    //             [membershippaidthrough] => June, 26 2020 00:00:00 +1000
    //             [email] => Jason@membes.com.au
    //         )
    //     */
    //     $userData = $socialInfo['response']['data']['DATA'][0];

    //     $email = $userData['email'];
    //     $firstName = $userData['firstname'];
    //     $lastName = $userData['surname'];

    //     $userSdk = new SdkUser();
    //     $userData = $userSdk->get([
    //         'email' => $email
    //     ]);
    //     if ($userData === null) {
            
    //         try {
    //             $userId = $userSdk->createUser(
    //                 [
    //                     'email' => $email,
    //                     'firstname' => $firstName,
    //                     'lastname' => $lastName
    //                 ],
    //                 FALSE
    //             );
    //         }
    //         catch(\Exception $e) {
                
    //         }
            
    //     }
    //     else {
    //         $userId = $userData['id'];
    //     }

    //     if (!empty($userId)) {
    //         $user = User::findOne($userId);
    //         Yii::$app->user->login($user, 0);
    //     }

        // Yii::$app->response->redirect(\yii\helpers\Url::base(true));
        // Yii::$app->end();
    // }

    // if($data['slug'] == 'contact-mail' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    //     return contactEmail();
    // }
    
    // return true;
}

function beforeArticleView($data)
{
}

