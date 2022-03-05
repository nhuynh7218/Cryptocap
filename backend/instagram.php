<?php
declare(strict_types=1);

use Instagram\Api;
use Instagram\Auth\Checkpoint\ImapClient;
use Instagram\Exception\InstagramException;

use Psr\Cache\CacheException;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;

require_once 'lib/functions.php';
require realpath(dirname(__FILE__)) . '/lib/instagram/vendor/autoload.php';


$usernames = array('username1', 'username2'); // Usernames
$random = rand(0,1);
$usernamex = $usernames[$random];
$passwordx = "igpass"; // Password (The password on all accounts must be the same.)
$ocr_api = '';

try {
  $cachePool = new FilesystemAdapter('cache');
  $api = new Api($cachePool);

  $imap_host = '';
  $imap_user = '';
  $imap_pass = '';
  $imapClient = new ImapClient($imap_host, $imap_user, $imap_pass);

  $api->login($usernamex, $passwordx, $imapClient);

  $profile = $api->getProfile('thecryptograph');
  $x=0;
  foreach($profile->getMedias() as $media){

    $content = $media->getCaption();
    $category = trim(strtolower(fetch_value($content, '#', '#')));

    if ($category != 'sponsored') {
      $intro = explode(".\n", $content)[0].'.';
      if(!empty($intro)){
        $display_url = $media->getDisplaySrc();
        $post_id = $media->getId();
        $vcc_feature_image = vcc_watermark($vcc_watermark, $display_url, $post_id);
        // $item['category'] = ucfirst($category);
        if(file_exists($ocr_img_path.'/'.$post_id.'.jpg')){
          // TO DO
          // SINCE CROPPPED IMAGE EXISTS FETCH TITLE TOO - TXT CREATE
          $ocr_data = file_get_contents('https://api.ocr.space/parse/imageurl?apikey='.$ocr_api.'&url='.$base_url.$ocr_img_path.'/'.$post_id.'.jpg');
          $ocr_title = json_decode($ocr_data); // decode the JSON feed
          if($ocr_title->ParsedResults[0]->ParsedText){
            $item['title'] = preg_replace('/\s+/', ' ', trim(ucwords(strtolower($ocr_title->ParsedResults[0]->ParsedText))));
          }else{
            continue;
          }
        }else{
          $file_name = ocr_crop_image($display_url, $post_id);
          $ocr_data = file_get_contents('https://api.ocr.space/parse/imageurl?apikey='.$ocr_api.'&url='.$base_url.$ocr_img_path.'/'.$post_id.'.jpg');
          $ocr_title = json_decode($ocr_data); // decode the JSON feed
          if($ocr_title->ParsedResults[0]->ParsedText){
            $item['title'] = preg_replace('/\s+/', ' ', trim(ucwords(strtolower($ocr_title->ParsedResults[0]->ParsedText))));
          }else{
            continue;
          }
        }
        $item['id'] = $post_id;
        $item['intro'] = $intro;
        $item['image'] = $base_url.$vcc_feature_image;
        $item['content'] = strstr($content, '#', true);
        $item['date'] = $media->getDate()->format('m-d-Y');
        $articles[] = $item;
      }
    }
    $x++;
    if($x==5) { break;}
  }

  $newArticles = array_reverse($articles, true);

} catch (InstagramException $e) {
  print_r($e->getMessage());
} catch (CacheException $e) {
  print_r($e->getMessage());
}
